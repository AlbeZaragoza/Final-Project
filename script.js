// Datos de películas por década
const moviesByDecade = {
    '1940s': [
        { rank: 1, title: 'Ciudadano Kane', year: 1941, director: 'Orson Welles' },
        { rank: 2, title: 'Casablanca', year: 1942, director: 'Michael Curtiz' },
        { rank: 15, title: 'Los Mejores Años de Nuestras Vidas', year: 1946, director: 'William Wyler' },
        { rank: 23, title: 'El Tesoro de Sierra Madre', year: 1948, director: 'John Huston' },
        { rank: 31, title: 'Perdición', year: 1944, director: 'Billy Wilder' }
    ],
    '1950s': [
        { rank: 4, title: 'Vértigo', year: 1958, director: 'Alfred Hitchcock' },
        { rank: 6, title: 'Cantando Bajo la Lluvia', year: 1952, director: 'Gene Kelly' },
        { rank: 11, title: 'La Ventana Indiscreta', year: 1954, director: 'Alfred Hitchcock' },
        { rank: 18, title: 'Los Siete Samuráis', year: 1954, director: 'Akira Kurosawa' },
        { rank: 25, title: 'Con la Muerte en los Talones', year: 1959, director: 'Alfred Hitchcock' }
    ],
    '1960s': [
        { rank: 5, title: '8½', year: 1963, director: 'Federico Fellini' },
        { rank: 7, title: 'Lawrence de Arabia', year: 1962, director: 'David Lean' },
        { rank: 12, title: 'Psicosis', year: 1960, director: 'Alfred Hitchcock' },
        { rank: 19, title: '2001: Una Odisea del Espacio', year: 1968, director: 'Stanley Kubrick' },
        { rank: 28, title: 'Bonnie y Clyde', year: 1967, director: 'Arthur Penn' }
    ],
    '1970s': [
        { rank: 3, title: 'El Padrino', year: 1972, director: 'Francis Ford Coppola' },
        { rank: 8, title: 'El Padrino II', year: 1974, director: 'Francis Ford Coppola' },
        { rank: 13, title: 'Chinatown', year: 1974, director: 'Roman Polanski' },
        { rank: 21, title: 'Apocalipsis Now', year: 1979, director: 'Francis Ford Coppola' },
        { rank: 29, title: 'Taxi Driver', year: 1976, director: 'Martin Scorsese' }
    ],
    '1980s': [
        { rank: 16, title: 'Toro Salvaje', year: 1980, director: 'Martin Scorsese' },
        { rank: 24, title: 'Blade Runner', year: 1982, director: 'Ridley Scott' },
        { rank: 33, title: 'Los Buenos Muchachos', year: 1990, director: 'Martin Scorsese' },
        { rank: 41, title: 'El Resplandor', year: 1980, director: 'Stanley Kubrick' },
        { rank: 47, title: 'Amadeus', year: 1984, director: 'Miloš Forman' }
    ],
    '1990s': [
        { rank: 9, title: 'Pulp Fiction', year: 1994, director: 'Quentin Tarantino' },
        { rank: 14, title: 'La Lista de Schindler', year: 1993, director: 'Steven Spielberg' },
        { rank: 22, title: 'Cadena Perpetua', year: 1994, director: 'Frank Darabont' },
        { rank: 35, title: 'Los Sospechosos de Siempre', year: 1995, director: 'Bryan Singer' },
        { rank: 42, title: 'Fargo', year: 1996, director: 'Joel y Ethan Coen' }
    ],
    '2000s': [
        { rank: 17, title: 'Mulholland Drive', year: 2001, director: 'David Lynch' },
        { rank: 26, title: 'El Señor de los Anillos: La Comunidad del Anillo', year: 2001, director: 'Peter Jackson' },
        { rank: 38, title: 'Pozos de Ambición', year: 2007, director: 'Paul Thomas Anderson' },
        { rank: 44, title: 'No Es País para Viejos', year: 2007, director: 'Joel y Ethan Coen' },
        { rank: 49, title: 'El Caballero Oscuro', year: 2008, director: 'Christopher Nolan' }
    ]
};

// Inicialización cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    initializeCurtains();
    initializeNavigation();
    initializeDecadeTabs();
    initializeScrollEffects();
    initializeMovieCardAnimations();
    initializeCinemaEffects();
    
    // Remover cortinas después de la animación
    setTimeout(() => {
        const curtainOverlay = document.querySelector('.curtain-overlay');
        if (curtainOverlay) {
            curtainOverlay.remove();
        }
    }, 6000);
});

// Inicializar cortinas mejoradas
function initializeCurtains() {
    const curtainOverlay = document.querySelector('.curtain-overlay');
    if (curtainOverlay) {
        // Asegurar que las cortinas estén visibles al inicio
        curtainOverlay.style.opacity = '1';
        curtainOverlay.style.visibility = 'visible';
        
        // Prevenir scroll durante la animación de cortinas
        document.body.style.overflow = 'hidden';
        
        // Restaurar scroll después de la animación
        setTimeout(() => {
            document.body.style.overflow = 'auto';
        }, 4000);
    }
}

// Inicializar navegación
function initializeNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle menu móvil
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Cerrar menu al hacer click en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Navegación suave
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.main-nav').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Actualizar enlace activo
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
}

// Función para scroll hacia las películas
function scrollToMovies() {
    const moviesSection = document.querySelector('#movies');
    if (moviesSection) {
        const navHeight = document.querySelector('.main-nav').offsetHeight;
        const targetPosition = moviesSection.offsetTop - navHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Hacer la función global para el botón HTML
window.scrollToMovies = scrollToMovies;

// Detectar scroll para actualizar navegación activa
function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const navHeight = document.querySelector('.main-nav').offsetHeight;
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navHeight - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Agregar listener para scroll
window.addEventListener('scroll', debounce(updateActiveNavOnScroll, 100));

// Funcionalidad de pestañas de décadas
function initializeDecadeTabs() {
    const tabs = document.querySelectorAll('.decade-tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const decade = this.dataset.decade;
            
            // Remover clase active de todas las pestañas
            tabs.forEach(t => t.classList.remove('active'));
            
            // Agregar clase active a la pestaña clickeada
            this.classList.add('active');
            
            // Ocultar todo el contenido
            document.querySelectorAll('.decade-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Mostrar contenido de la década seleccionada
            showDecadeContent(decade);
        });
    });
}

// Mostrar contenido de década específica
function showDecadeContent(decade) {
    const contentContainer = document.querySelector('.decade-content.active') || 
                           document.querySelector('.decade-content');
    
    if (contentContainer && moviesByDecade[decade]) {
        contentContainer.innerHTML = createMovieList(moviesByDecade[decade]);
        contentContainer.classList.add('active');
    }
}

// Crear lista de películas
function createMovieList(movies) {
    return `
        <div class="movie-list">
            ${movies.map(movie => `
                <div class="movie-item">
                    <span class="rank">#${movie.rank}</span>
                    <span class="title">${movie.title}</span>
                    <span class="year">${movie.year}</span>
                </div>
            `).join('')}
        </div>
    `;
}

// Efectos de scroll
function initializeScrollEffects() {
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Animaciones de tarjetas de películas
function initializeMovieCardAnimations() {
    const movieCards = document.querySelectorAll('.movie-card');
    
    movieCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in-up');
        
        // Efecto hover mejorado
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) rotateY(5deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateY(0deg)';
        });
    });
}

// Navegación suave
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Efecto de partículas en el fondo (opcional)
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255, 215, 0, 0.3);
            border-radius: 50%;
            animation: float ${Math.random() * 10 + 5}s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        particlesContainer.appendChild(particle);
    }
    
    document.body.appendChild(particlesContainer);
}

// Agregar animación CSS para partículas
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% { transform: translateY(0px) rotate(0deg); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
    }
    
    .fade-in-up {
        animation: fadeInUp 0.8s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .movie-card {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
`;
document.head.appendChild(style);

// Inicializar partículas (comentado por defecto para mejor rendimiento)
// createParticles();

// Efecto de máquina de escribir para el título
function typewriterEffect() {
    const title = document.querySelector('.golden-text');
    if (title) {
        const text = title.textContent;
        title.textContent = '';
        title.style.borderRight = '2px solid var(--gold)';
        
        let i = 0;
        const timer = setInterval(() => {
            title.textContent += text[i];
            i++;
            if (i >= text.length) {
                clearInterval(timer);
                setTimeout(() => {
                    title.style.borderRight = 'none';
                }, 1000);
            }
        }, 100);
    }
}

// Efectos cinematográficos mejorados
function initializeCinemaEffects() {
    // Botón de entrada al cine
    const enterBtn = document.querySelector('.enter-cinema-btn');
    if (enterBtn) {
        enterBtn.addEventListener('click', function() {
            // Scroll suave hacia el contenido principal
            document.querySelector('.main-content').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Efecto de flash
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }
    
    // Crear partículas de polvo dinámicas
    createDustParticles();
    
    // Efecto de parpadeo en las luces del teatro
    createTheaterLightEffect();
    
    // Animación del proyector
    animateProjector();
}

// Crear partículas de polvo cinematográfico
function createDustParticles() {
    const dustContainer = document.querySelector('.dust-particles');
    if (!dustContainer) return;
    
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'dust-particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 3 + 1}px;
            background: rgba(255, 215, 0, ${Math.random() * 0.6 + 0.2});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: dustFloat ${Math.random() * 10 + 8}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        dustContainer.appendChild(particle);
    }
}

// Efecto de luces del teatro
function createTheaterLightEffect() {
    const lights = document.querySelectorAll('.spotlight');
    lights.forEach((light, index) => {
        setInterval(() => {
            light.style.opacity = Math.random() * 0.4 + 0.3;
        }, 2000 + index * 1000);
    });
}

// Animación del proyector
function animateProjector() {
    const lightBeam = document.querySelector('.light-beam');
    if (lightBeam) {
        setInterval(() => {
            lightBeam.style.opacity = Math.random() * 0.3 + 0.1;
        }, 1500);
    }
}

// Efecto de estadísticas animadas
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalNumber = target.textContent;
                const isPlus = finalNumber.includes('+');
                const number = parseInt(finalNumber.replace('+', ''));
                
                let current = 0;
                const increment = number / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= number) {
                        target.textContent = finalNumber;
                        clearInterval(timer);
                    } else {
                        target.textContent = Math.floor(current) + (isPlus ? '+' : '');
                    }
                }, 50);
                
                observer.unobserve(target);
            }
        });
    });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

// Efecto de máquina de escribir mejorado
function typewriterEffect() {
    const title = document.querySelector('.golden-text');
    if (title) {
        const text = title.textContent;
        title.textContent = '';
        title.style.borderRight = '3px solid var(--gold)';
        
        let i = 0;
        const timer = setInterval(() => {
            title.textContent += text[i];
            i++;
            if (i >= text.length) {
                clearInterval(timer);
                setTimeout(() => {
                    title.style.borderRight = 'none';
                    // Iniciar animación de estadísticas después del título
                    animateStats();
                }, 1000);
            }
        }, 80);
    }
}

// Activar efectos después de que se abran las cortinas
setTimeout(() => {
    typewriterEffect();
}, 3500);
// 
Datos completos de las 100 películas (muestra expandida)
const completeMovieList = [
    { rank: 1, title: 'Ciudadano Kane', year: 1941, director: 'Orson Welles', genre: 'Drama', country: 'EE.UU.', duration: 119 },
    { rank: 2, title: 'Casablanca', year: 1942, director: 'Michael Curtiz', genre: 'Romance', country: 'EE.UU.', duration: 102 },
    { rank: 3, title: 'El Padrino', year: 1972, director: 'Francis Ford Coppola', genre: 'Drama', country: 'EE.UU.', duration: 175 },
    { rank: 4, title: 'Vértigo', year: 1958, director: 'Alfred Hitchcock', genre: 'Thriller', country: 'EE.UU.', duration: 128 },
    { rank: 5, title: '8½', year: 1963, director: 'Federico Fellini', genre: 'Drama', country: 'Italia', duration: 138 },
    { rank: 6, title: 'Cantando Bajo la Lluvia', year: 1952, director: 'Gene Kelly', genre: 'Musical', country: 'EE.UU.', duration: 103 },
    { rank: 7, title: 'Lawrence de Arabia', year: 1962, director: 'David Lean', genre: 'Épica', country: 'Reino Unido', duration: 228 },
    { rank: 8, title: 'El Padrino II', year: 1974, director: 'Francis Ford Coppola', genre: 'Drama', country: 'EE.UU.', duration: 202 },
    { rank: 9, title: 'Pulp Fiction', year: 1994, director: 'Quentin Tarantino', genre: 'Crime', country: 'EE.UU.', duration: 154 },
    { rank: 10, title: 'Apocalipsis Now', year: 1979, director: 'Francis Ford Coppola', genre: 'Guerra', country: 'EE.UU.', duration: 147 },
    { rank: 11, title: 'La Ventana Indiscreta', year: 1954, director: 'Alfred Hitchcock', genre: 'Thriller', country: 'EE.UU.', duration: 112 },
    { rank: 12, title: 'Psicosis', year: 1960, director: 'Alfred Hitchcock', genre: 'Thriller', country: 'EE.UU.', duration: 109 },
    { rank: 13, title: 'Chinatown', year: 1974, director: 'Roman Polanski', genre: 'Neo-noir', country: 'EE.UU.', duration: 130 },
    { rank: 14, title: 'La Lista de Schindler', year: 1993, director: 'Steven Spielberg', genre: 'Drama', country: 'EE.UU.', duration: 195 },
    { rank: 15, title: 'Los Mejores Años de Nuestras Vidas', year: 1946, director: 'William Wyler', genre: 'Drama', country: 'EE.UU.', duration: 170 },
    { rank: 16, title: 'Toro Salvaje', year: 1980, director: 'Martin Scorsese', genre: 'Biografía', country: 'EE.UU.', duration: 129 },
    { rank: 17, title: 'Mulholland Drive', year: 2001, director: 'David Lynch', genre: 'Thriller', country: 'EE.UU.', duration: 147 },
    { rank: 18, title: 'Los Siete Samuráis', year: 1954, director: 'Akira Kurosawa', genre: 'Acción', country: 'Japón', duration: 207 },
    { rank: 19, title: '2001: Una Odisea del Espacio', year: 1968, director: 'Stanley Kubrick', genre: 'Ciencia Ficción', country: 'Reino Unido', duration: 149 },
    { rank: 20, title: 'Sunset Boulevard', year: 1950, director: 'Billy Wilder', genre: 'Drama', country: 'EE.UU.', duration: 110 },
    // Añadir más películas aquí para completar las 100...
];

// Variables para paginación
let currentPage = 1;
const moviesPerPage = 10;
let filteredMovies = [...completeMovieList];

// Inicializar funcionalidades expandidas
document.addEventListener('DOMContentLoaded', function() {
    // Funcionalidades existentes
    initializeDecadeTabs();
    initializeScrollEffects();
    initializeMovieCardAnimations();
    initializeCinemaEffects();
    
    // Nuevas funcionalidades
    initializeCompleteList();
    initializeTriviaSection();
    initializeSearch();
    
    // Remover cortinas después de la animación
    setTimeout(() => {
        const curtainContainer = document.querySelector('.curtain-container');
        if (curtainContainer) {
            curtainContainer.style.display = 'none';
        }
    }, 3500);
});

// Inicializar lista completa
function initializeCompleteList() {
    displayMovies();
    setupPagination();
    
    // Event listeners para filtros
    const decadeFilter = document.getElementById('decade-filter');
    if (decadeFilter) {
        decadeFilter.addEventListener('change', filterByDecade);
    }
}

// Mostrar películas en la lista completa
function displayMovies() {
    const container = document.getElementById('complete-movie-list');
    if (!container) return;
    
    const startIndex = (currentPage - 1) * moviesPerPage;
    const endIndex = startIndex + moviesPerPage;
    const moviesToShow = filteredMovies.slice(startIndex, endIndex);
    
    container.innerHTML = moviesToShow.map(movie => `
        <div class="movie-card compact" data-rank="${movie.rank}">
            <div class="movie-poster compact">
                <div class="poster-placeholder">🎬</div>
                <div class="rank-badge">${movie.rank}</div>
            </div>
            <div class="movie-info compact">
                <h4>${movie.title}</h4>
                <p class="year">${movie.year}</p>
                <p class="director">${movie.director}</p>
                <div class="movie-meta">
                    <span class="genre">${movie.genre}</span>
                    <span class="duration">${movie.duration} min</span>
                </div>
            </div>
        </div>
    `).join('');
    
    updatePaginationInfo();
}

// Configurar paginación
function setupPagination() {
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                displayMovies();
                scrollToSection('complete-list');
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                displayMovies();
                scrollToSection('complete-list');
            }
        });
    }
}

// Actualizar información de paginación
function updatePaginationInfo() {
    const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);
    const currentPageSpan = document.getElementById('current-page');
    const totalPagesSpan = document.getElementById('total-pages');
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');
    
    if (currentPageSpan) currentPageSpan.textContent = currentPage;
    if (totalPagesSpan) totalPagesSpan.textContent = totalPages;
    
    if (prevBtn) prevBtn.disabled = currentPage === 1;
    if (nextBtn) nextBtn.disabled = currentPage === totalPages;
}

// Filtrar por década
function filterByDecade() {
    const decadeFilter = document.getElementById('decade-filter');
    const selectedDecade = decadeFilter.value;
    
    if (selectedDecade === '') {
        filteredMovies = [...completeMovieList];
    } else {
        const startYear = parseInt(selectedDecade);
        const endYear = startYear + 9;
        filteredMovies = completeMovieList.filter(movie => 
            movie.year >= startYear && movie.year <= endYear
        );
    }
    
    currentPage = 1;
    displayMovies();
}

// Inicializar búsqueda
function initializeSearch() {
    const searchInput = document.getElementById('movie-search');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchInput) {
        searchInput.addEventListener('input', debounce(performSearch, 300));
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }
}

// Realizar búsqueda
function performSearch() {
    const searchInput = document.getElementById('movie-search');
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        filteredMovies = [...completeMovieList];
    } else {
        filteredMovies = completeMovieList.filter(movie =>
            movie.title.toLowerCase().includes(searchTerm) ||
            movie.director.toLowerCase().includes(searchTerm) ||
            movie.genre.toLowerCase().includes(searchTerm)
        );
    }
    
    currentPage = 1;
    displayMovies();
}

// Función debounce para optimizar búsqueda
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

// Inicializar sección de curiosidades
function initializeTriviaSection() {
    const triviaTabs = document.querySelectorAll('.trivia-tab');
    
    triviaTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.dataset.tab;
            
            // Remover clase active de todas las pestañas
            triviaTabs.forEach(t => t.classList.remove('active'));
            
            // Agregar clase active a la pestaña clickeada
            this.classList.add('active');
            
            // Ocultar todo el contenido
            document.querySelectorAll('.trivia-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Mostrar contenido de la pestaña seleccionada
            const targetContent = document.getElementById(`${targetTab}-content`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// Función auxiliar para scroll suave a secciones
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Mejorar navegación suave existente
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        scrollToSection(targetId);
        
        // Actualizar navegación activa
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

// Detectar sección activa durante scroll
function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Agregar listener para scroll
window.addEventListener('scroll', debounce(updateActiveNavigation, 100));

// Animaciones adicionales para elementos que aparecen
function observeElements() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-cinema');
            }
        });
    }, observerOptions);
    
    // Observar elementos específicos
    document.querySelectorAll('.award-category, .trivia-card, .director-card').forEach(el => {
        observer.observe(el);
    });
}

// Inicializar observador de elementos
setTimeout(observeElements, 1000);

// Efecto de contador para estadísticas en footer
function animateFooterStats() {
    const footerStats = document.querySelectorAll('.footer-stats span');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInCinema 0.8s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    });
    
    footerStats.forEach(stat => observer.observe(stat));
}

// Inicializar animaciones de footer
setTimeout(animateFooterStats, 2000);// F
uncionalidades mejoradas para la sección de directores
function initializeDirectorsSection() {
    // Animación de entrada para las tarjetas de directores
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
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
    }, observerOptions);
    
    // Observar tarjetas de directores
    document.querySelectorAll('.director-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Observar director destacado
    const featuredDirector = document.querySelector('.director-spotlight');
    if (featuredDirector) {
        featuredDirector.style.opacity = '0';
        featuredDirector.style.transform = 'translateY(50px)';
        featuredDirector.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(featuredDirector);
    }
    
    // Animación de contador para estadísticas
    initializeDirectorStats();
    
    // Efectos hover mejorados
    initializeDirectorHoverEffects();
    
    // Animación de línea de tiempo
    initializeTimelineAnimation();
}

// Animación de contadores para estadísticas de directores
function initializeDirectorStats() {
    const statNumbers = document.querySelectorAll('.achievement-number, .stat-mini .number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalNumber = target.textContent;
                const isPlus = finalNumber.includes('+');
                const number = parseInt(finalNumber.replace('+', ''));
                
                if (!isNaN(number)) {
                    animateCounter(target, number, isPlus);
                }
                observer.unobserve(target);
            }
        });
    });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

// Función para animar contadores
function animateCounter(element, finalNumber, hasPlus = false) {
    let current = 0;
    const increment = finalNumber / 30;
    const timer = setInterval(() => {
        current += increment;
        if (current >= finalNumber) {
            element.textContent = finalNumber + (hasPlus ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (hasPlus ? '+' : '');
        }
    }, 50);
}

// Efectos hover mejorados para tarjetas de directores
function initializeDirectorHoverEffects() {
    const directorCards = document.querySelectorAll('.director-card');
    
    directorCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Efecto de brillo en el avatar
            const avatar = this.querySelector('.director-avatar');
            if (avatar) {
                avatar.style.boxShadow = '0 0 25px rgba(255, 215, 0, 0.6), 0 5px 15px rgba(0, 0, 0, 0.3)';
                avatar.style.transform = 'scale(1.1)';
            }
            
            // Efecto en las películas destacadas
            const films = this.querySelectorAll('.featured-films span');
            films.forEach((film, index) => {
                setTimeout(() => {
                    film.style.transform = 'translateY(-2px)';
                    film.style.boxShadow = '0 5px 10px rgba(0, 0, 0, 0.3)';
                }, index * 100);
            });
        });
        
        card.addEventListener('mouseleave', function() {
            // Restaurar avatar
            const avatar = this.querySelector('.director-avatar');
            if (avatar) {
                avatar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
                avatar.style.transform = 'scale(1)';
            }
            
            // Restaurar películas
            const films = this.querySelectorAll('.featured-films span');
            films.forEach(film => {
                film.style.transform = 'translateY(0)';
                film.style.boxShadow = 'none';
            });
        });
    });
    
    // Efecto especial para el director destacado
    const featuredDirector = document.querySelector('.director-spotlight');
    if (featuredDirector) {
        featuredDirector.addEventListener('mouseenter', function() {
            const avatar = this.querySelector('.director-avatar-large');
            const glow = this.querySelector('.director-glow');
            
            if (avatar) {
                avatar.style.transform = 'scale(1.05) rotateY(5deg)';
                avatar.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.6), inset 0 0 30px rgba(255, 255, 255, 0.3)';
            }
            
            if (glow) {
                glow.style.transform = 'scale(1.2)';
                glow.style.opacity = '0.8';
            }
        });
        
        featuredDirector.addEventListener('mouseleave', function() {
            const avatar = this.querySelector('.director-avatar-large');
            const glow = this.querySelector('.director-glow');
            
            if (avatar) {
                avatar.style.transform = 'scale(1) rotateY(0deg)';
                avatar.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.2)';
            }
            
            if (glow) {
                glow.style.transform = 'scale(1)';
                glow.style.opacity = '0.3';
            }
        });
    }
}

// Animación de línea de tiempo
function initializeTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Efecto especial en el año
                    const year = entry.target.querySelector('.timeline-year');
                    if (year) {
                        year.style.animation = 'pulse 0.6s ease-in-out';
                    }
                }, index * 200);
                observer.unobserve(entry.target);
            }
        });
    });
    
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
}

// Función para crear efecto de partículas en el director destacado
function createDirectorParticles() {
    const spotlight = document.querySelector('.director-spotlight');
    if (!spotlight) return;
    
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255, 215, 0, 0.6);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: floatParticle ${Math.random() * 8 + 6}s linear infinite;
            animation-delay: ${Math.random() * 3}s;
        `;
        spotlight.appendChild(particle);
    }
}

// Agregar animación CSS para partículas
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes floatParticle {
        0% { 
            transform: translateY(0) rotate(0deg);
            opacity: 0;
        }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { 
            transform: translateY(-50px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

// Inicializar todas las funcionalidades de directores
document.addEventListener('DOMContentLoaded', function() {
    // ... funciones existentes ...
    
    // Añadir inicialización de directores
    setTimeout(() => {
        initializeDirectorsSection();
        createDirectorParticles();
    }, 1000);
});