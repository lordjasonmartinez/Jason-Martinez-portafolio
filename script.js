/**
 * PORTAFOLIO JASON MARTÍNEZ - 2026
 * Funcionalidades: Scroll suave, Animaciones, Filtro y Ventanas Modales de Proyectos
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. SCROLL SUAVE PARA LOS ENLACES DEL MENÚ ---
    const menuLinks = document.querySelectorAll('.nav-links a');

    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // --- 2. LÓGICA DEL MODAL (VENTANA EMERGENTE) ---
    // Definimos las funciones globalmente para que el 'onclick' del HTML las encuentre
    
    window.openProject = function(projectId) {
        const modal = document.getElementById("project-modal");
        const modalBody = document.getElementById("modal-body");

        // Cargamos el archivo JSON
        fetch('proyectos.json')
            .then(response => response.json())
            .then(data => {
                // Buscamos el proyecto que coincida con el ID
                const proyecto = data.find(p => p.id === projectId);
                
                if (proyecto) {
                    modalBody.innerHTML = proyecto.descripcion;
                    modal.style.display = "block";
                    document.body.style.overflow = "hidden";
                }
            })
            .catch(error => console.error('Error cargando el proyecto:', error));
    };

    window.closeModal = function() {
        const modal = document.getElementById("project-modal");
        modal.style.display = "none";
        document.body.style.overflow = "auto"; // Devuelve el scroll a la página
    };

    // Cerrar si hacen clic en la "X" o fuera de la caja blanca
    const closeBtn = document.querySelector(".close-modal");
    if (closeBtn) {
        closeBtn.onclick = closeModal;
    }

    window.addEventListener('click', (event) => {
        const modal = document.getElementById("project-modal");
        if (event.target == modal) {
            closeModal();
        }
    });


    // --- 3. ANIMACIÓN DE REVELADO (Intersection Observer) ---
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const elementsToReveal = document.querySelectorAll('section, .project-card, .profile-frame');
    elementsToReveal.forEach(el => {
        el.classList.add('reveal-hidden');
        revealOnScroll.observe(el);
    });


    // --- 4. INDICADOR DE SECCIÓN ACTIVA ---
    window.addEventListener('scroll', () => {
        let current = "";
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        menuLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });



    // --- LÓGICA DEL MENÚ HAMBURGUESA MEJORADA ---
    const menuToggle = document.querySelector('#mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links .nav-item'); // Selecciona solo los items del menú

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('is-active'); // Animación de hamburguesa a X
        navLinks.classList.toggle('active'); // Muestra/oculta el menú
    });

    // CERRAR EL MENÚ AUTOMÁTICAMENTE AL HACER CLIC EN UN ENLACE
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            menuToggle.classList.remove('is-active'); // Vuelve la hamburguesa
            navLinks.classList.remove('active'); // Oculta el menú
        });
    });

    // --- 5. LÓGICA DE FILTRADO DE PORTAFOLIO ---
    window.filterProjects = function(category) {
        const cards = document.querySelectorAll('.project-card');
        const buttons = document.querySelectorAll('.filter-btn');

        buttons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('onclick').includes(category)) {
                btn.classList.add('active');
            }
        });

        cards.forEach(card => {
            card.style.opacity = "0"; 
            setTimeout(() => {
                if (category === 'all' || card.classList.contains(category)) {
                    card.style.display = 'block';
                    setTimeout(() => { card.style.opacity = "1"; }, 50);
                } else {
                    card.style.display = 'none';
                }
            }, 300);
        });
    };
});