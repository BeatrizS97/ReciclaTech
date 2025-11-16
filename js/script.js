// Script para Menu Hambúrguer e Carrossel de Depoimentos - ReciclaTech

/* 
   MENU HAMBÚRGUER
   Controla abertura/fechamento do menu mobile
*/
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;

    // Abrir/fechar menu ao clicar no botão hambúrguer
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Previne scroll quando menu está aberto
            if (navMenu.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });
    }

    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 1024) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                body.style.overflow = '';
            }
        });
    });

    // Fechar menu ao clicar fora dele
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = navMenu.contains(event.target);
        const isClickOnToggle = menuToggle.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnToggle && navMenu.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            body.style.overflow = '';
        }
    });

    /* 
       CARROSSEL DE DEPOIMENTOS
       Controla navegação entre depoimentos em tablet/mobile
    */
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const navDots = document.querySelectorAll('.nav-dot');
    let currentTestimonial = 0;

    // Função para mostrar depoimento específico
    function showTestimonial(index) {
        // Esconder todos os cards
        testimonialCards.forEach(card => {
            card.style.display = 'none';
        });

        // Remover classe active de todos os dots
        navDots.forEach(dot => {
            dot.classList.remove('active');
        });

        // Mostrar card atual
        if (testimonialCards[index]) {
            testimonialCards[index].style.display = 'flex';
        }

        // Ativar dot correspondente
        if (navDots[index]) {
            navDots[index].classList.add('active');
        }

        currentTestimonial = index;
    }

    // Adicionar evento de clique nos dots
    navDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showTestimonial(index);
        });
    });

    // Navegação por swipe (touch) - para melhor UX em mobile
    let touchStartX = 0;
    let touchEndX = 0;

    const testimonialsGrid = document.querySelector('.testimonials-grid');

    if (testimonialsGrid) {
        testimonialsGrid.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        testimonialsGrid.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    }

    function handleSwipe() {
        // Swipe para esquerda (próximo)
        if (touchEndX < touchStartX - 50) {
            const nextIndex = (currentTestimonial + 1) % testimonialCards.length;
            showTestimonial(nextIndex);
        }
        
        // Swipe para direita (anterior)
        if (touchEndX > touchStartX + 50) {
            const prevIndex = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
            showTestimonial(prevIndex);
        }
    }

    // Ajustar visualização ao redimensionar janela
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth > 1024) {
                // Desktop: mostrar todos os cards
                testimonialCards.forEach(card => {
                    card.style.display = 'flex';
                });
                // Fechar menu se estiver aberto
                if (navMenu.classList.contains('active')) {
                    menuToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    body.style.overflow = '';
                }
            } else {
                // Tablet/Mobile: ativar carrossel
                showTestimonial(currentTestimonial);
            }
        }, 250);
    });

    // Inicializar visualização correta ao carregar
    if (window.innerWidth <= 1024) {
        showTestimonial(0);
    }
});