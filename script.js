/**
 * PORTAFOLIO JASON MARTÍNEZ - 2026
 * Funcionalidades: Scroll suave, Animaciones de entrada y Filtro de proyectos
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. SCROLL SUAVE PARA LOS ENLACES DEL MENÚ
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

    // 2. ANIMACIÓN DE REVELADO (Intersection Observer)
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

    // 3. INDICADOR DE SECCIÓN ACTIVA
    window.addEventListener('scroll', () => {
        let current = "";
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= (sectionTop - 200)) {
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

    // 4. LÓGICA DE FILTRADO DE PORTAFOLIO (NUEVO)
    // Definimos la función dentro del scope para que los botones la encuentren
    window.filterProjects = function(category) {
        const cards = document.querySelectorAll('.project-card');
        const buttons = document.querySelectorAll('.filter-btn');

        // Manejo de botones activos
        buttons.forEach(btn => {
            btn.classList.remove('active');
            // Verificamos si el botón coincide con la categoría o si es "Todos"
            if (btn.getAttribute('onclick').includes(category)) {
                btn.classList.add('active');
            }
        });

        // Filtrar tarjetas con animación sutil
        cards.forEach(card => {
            card.style.opacity = "0"; // Efecto de desvanecido al filtrar
            
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