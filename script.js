// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scroll para links del navbar
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Si es un link externo (index.html), no prevenir default
        if (href === 'index.html') {
            return;
        }
        
        // Si es un anchor link, hacer smooth scroll
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetSection = document.querySelector(href);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Manejo del formulario de comentarios
document.getElementById('commentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const comment = document.getElementById('comment').value;
    
    // Crear nuevo comentario
    const newComment = document.createElement('article');
    newComment.className = 'comment';
    
    const today = new Date();
    const dateStr = today.toLocaleDateString('es-ES', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
    });
    
    newComment.innerHTML = `
        <div class="comment-header">
            <span class="comment-author">${name}</span>
            <span class="comment-date">${dateStr}</span>
        </div>
        <p class="comment-text">${comment}</p>
    `;
    
    // Agregar al inicio de la lista de nuevos comentarios
    const newCommentsContainer = document.getElementById('newComments');
    newCommentsContainer.insertBefore(newComment, newCommentsContainer.firstChild);
    
    // Limpiar formulario
    this.reset();
    
    // Scroll al nuevo comentario
    newComment.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Feedback visual
    newComment.style.backgroundColor = '#fffbea';
    setTimeout(() => {
        newComment.style.transition = 'background-color 1s';
        newComment.style.backgroundColor = 'transparent';
    }, 2000);
});

// Modal de suscripción
const modal = document.getElementById('subscribeModal');

function openSubscribeModal() {
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeSubscribeModal() {
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Cerrar modal al hacer click fuera
window.addEventListener('click', function(e) {
    if (e.target === modal) {
        closeSubscribeModal();
    }
});

// Cerrar modal con ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
        closeSubscribeModal();
    }
});

// Manejar formulario del modal
const modalForm = document.getElementById('modalSubscribeForm');
if (modalForm) {
    modalForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('subscribeName').value;
        const email = document.getElementById('subscribeEmail').value;
        
        // Guardar en localStorage
        localStorage.setItem('cineclub_user_name', name);
        localStorage.setItem('cineclub_user_email', email);
        localStorage.setItem('cineclub_subscribed', 'true');
        
        // Cerrar modal
        closeSubscribeModal();
        
        // Mostrar notificación de éxito
        showSuccessNotification(name, email);
        
        // Limpiar formulario
        this.reset();
    });
}

// Función para mostrar notificación de éxito
function showSuccessNotification(name, email) {
    const notification = document.createElement('div');
    notification.className = 'success-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <div class="notification-text">
                <h3>¡Bienvenido a CineClub, ${name}!</h3>
                <p>Te enviaremos contenido exclusivo a: ${email}</p>
                <div class="notification-progress">
                    <div class="progress-bar"></div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 500);
    }, 4000);
}

// Actualizar contador de suscriptores
function updateSubscriberCount() {
    const countElement = document.getElementById('subscriberCount');
    if (countElement) {
        const baseCount = 2500;
        const randomAdd = Math.floor(Math.random() * 50);
        const total = baseCount + randomAdd;
        countElement.textContent = `+${total.toLocaleString()} cinéfilos ya suscritos`;
    }
}

// Actualizar contador al cargar
updateSubscriberCount();

// Actualizar cada 30 segundos
setInterval(updateSubscriberCount, 30000);

console.log('CineClub - Cargado');
