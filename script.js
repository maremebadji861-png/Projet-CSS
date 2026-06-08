document.addEventListener('DOMContentLoaded', function() {

    // ========================================
    // SLIDER HERO - VÉRIFICATION EXISTENCE
    // ========================================
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slider-controls .prev');
    const nextBtn = document.querySelector('.slider-controls .next');
    let currentSlide = 0;
    let slideInterval;

    // Vérifier si le slider existe sur cette page
    if (slides.length > 0) {
        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.remove('active');
                const text = slide.querySelector('.slide-text');
                if (text) {
                    text.style.opacity = '0';
                    text.style.transform = 'translateX(-30px)';
                }
            });

            // Vérifier que l'index est valide
            if (slides[index]) {
                slides[index].classList.add('active');

                const activeText = slides[index].querySelector('.slide-text');
                if (activeText) {
                    setTimeout(() => {
                        activeText.style.transition = 'all 0.6s ease';
                        activeText.style.opacity = '1';
                        activeText.style.transform = 'translateX(0)';
                    }, 100);
                }
            }
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        }

        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                resetInterval();
            });
            nextBtn.addEventListener('click', () => {
                nextSlide();
                resetInterval();
            });
        }

        function startInterval() {
            slideInterval = setInterval(nextSlide, 6000);
        }

        function resetInterval() {
            clearInterval(slideInterval);
            startInterval();
        }

        showSlide(0);
        startInterval();

        const slider = document.querySelector('.hero-slider');
        if (slider) {
            slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
            slider.addEventListener('mouseleave', startInterval);
        }
    }

    // ========================================
    // SCROLL TO TOP
    // ========================================
    const scrollTopBtn = document.getElementById('scrollTop');

    if (scrollTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ========================================
    // NAVIGATION SMOOTH SCROLL
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerOffset = 120;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // MOBILE MENU + DROPDOWN TOGGLE
    // ========================================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    const dropdowns = document.querySelectorAll('.dropdown');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            const icon = this.querySelector('i');
            if (mainNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        if (link) {
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 1024) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
            });
        }
    });

    // ========================================
    // ANIMATIONS AU SCROLL (Intersection Observer)
    // ========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.chiffre-item').forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(item);
    });

    document.querySelectorAll('.activite-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.15}s`;
        observer.observe(card);
    });

    // ========================================
    // SEARCH BAR FOCUS
    // ========================================
    const searchInput = document.querySelector('.search-wrapper input');
    if (searchInput) {
        searchInput.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
            this.parentElement.style.transition = 'transform 0.3s';
        });

        searchInput.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    }

    // ========================================
    // COOKIE NOTICE
    // ========================================
    const cookieNotice = document.querySelector('.cookie-notice');
    if (cookieNotice) {
        cookieNotice.addEventListener('click', function() {
            this.style.display = 'none';
        });
        cookieNotice.style.cursor = 'pointer';
    }

    // ========================================
    // NAVBAR ACTIVE STATE ON SCROLL
    // ========================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

    window.addEventListener('scroll', function() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // ========================================
    // PARALLAX EFFECT ON HERO
    // ========================================
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const canneLeft = document.querySelector('.canne-left');
        const canneRight = document.querySelector('.canne-right');

        if (canneLeft && canneRight && scrolled < 600) {
            canneLeft.style.transform = `translateY(${scrolled * 0.3}px)`;
            canneRight.style.transform = `translateY(${scrolled * -0.2}px)`;
        }
    });

    // ========================================
    // COUNTER ANIMATION FOR CHIFFRES
    // ========================================
    function animateCounter(element, target, suffix = '') {
        let current = 0;
        const increment = target / 60;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target.toLocaleString('fr-FR') + suffix;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current).toLocaleString('fr-FR') + suffix;
            }
        }, 30);
    }

    const chiffresSection = document.querySelector('.chiffres');
    let countersAnimated = false;

    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                countersAnimated = true;

                // Récupérer tous les h3 dans les chiffre-item de cette section
                const chiffreItems = entry.target.querySelectorAll('.chiffre-item h3');
                
                const counters = [
                    { el: chiffreItems[0], target: 53, suffix: ' ans' },
                    { el: chiffreItems[1], target: 12000, suffix: ' ha' },
                    { el: chiffreItems[2], target: 1500000, suffix: ' T' },
                    { el: chiffreItems[3], target: 145000, suffix: ' T' },
                    { el: chiffreItems[4], target: 13000000, suffix: ' L' },
                    { el: chiffreItems[5], target: 1, suffix: ' er' },
                    { el: chiffreItems[6], target: 8000, suffix: '' }
                ];

                counters.forEach((counter, index) => {
                    if (counter.el) {
                        setTimeout(() => {
                            animateCounter(counter.el, counter.target, counter.suffix);
                        }, index * 200);
                    }
                });
            }
        });
    }, { threshold: 0.3 });

    if (chiffresSection) {
        counterObserver.observe(chiffresSection);
    }

    // ========================================
    // À PROPOS - Animation au scroll
    // ========================================
    const aproposSection = document.querySelector('.apropos');
    const circleImage = document.querySelector('.circle-image');
    const aproposText = document.querySelector('.apropos-text');

    if (aproposSection) {
        const aproposObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (circleImage) {
                        circleImage.style.transition = 'all 0.8s ease';
                        circleImage.style.opacity = '1';
                        circleImage.style.transform = 'scale(1)';
                    }
                    if (aproposText) {
                        aproposText.style.transition = 'all 0.8s ease 0.3s';
                        aproposText.style.opacity = '1';
                        aproposText.style.transform = 'translateX(0)';
                    }
                }
            });
        }, { threshold: 0.3 });

        if (circleImage) {
            circleImage.style.opacity = '0';
            circleImage.style.transform = 'scale(0.8)';
        }
        if (aproposText) {
            aproposText.style.opacity = '0';
            aproposText.style.transform = 'translateX(30px)';
        }
        aproposObserver.observe(aproposSection);
    }

    // ========================================
    // HEADER SCROLL EFFECT
    // ========================================
    let lastScroll = 0;
    const header = document.querySelector('.main-header');

    if (header) {
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 100) {
                header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
            } else {
                header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
            }

            lastScroll = currentScroll;
        });
    }

    console.log('CSS.SN Clone - Site chargé avec succès!');
});
// ========================================
// ANIMATION TIMELINE HISTORIQUE
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const timelineItems = document.querySelectorAll('.timeline-item');

    if (timelineItems.length > 0) {
        const timelineObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.2, rootMargin: '0px 0px -30px 0px' });

        timelineItems.forEach(item => {
            timelineObserver.observe(item);
        });
    }
});

// ========================================
// ANIMATIONS PAGE IMPLANTATION
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const usineContent = document.querySelector('.usine-content');
    const casiersContent = document.querySelector('.casiers-content');

    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -30px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    if (usineContent) observer.observe(usineContent);
    if (casiersContent) observer.observe(casiersContent);
});
/* ========================================
   PRODUITS.JS - Animations page produits
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {

    // ========================================
    // ANIMATION APPARITION PRODUITS (stagger)
    // ========================================
    const produitCards = document.querySelectorAll('.produit-card');

    const observerProduits = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observerProduits.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -30px 0px'
    });

    produitCards.forEach(card => {
        observerProduits.observe(card);
    });

    // ========================================
    // ANIMATION APPARITION GAMMES
    // ========================================
    const gammeCards = document.querySelectorAll('.gamme-card');

    const observerGammes = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observerGammes.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    gammeCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.15}s, transform 0.5s ease ${index * 0.15}s`;
        observerGammes.observe(card);
    });

    // ========================================
    // ANIMATION TITRE + SÉPARATEUR
    // ========================================
    const produitsTitle = document.querySelector('.produits-title h1');
    const titleSeparator = document.querySelector('.produits-title .title-separator');

    if (produitsTitle) {
        produitsTitle.style.opacity = '0';
        produitsTitle.style.transform = 'translateY(20px)';
        produitsTitle.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

        setTimeout(() => {
            produitsTitle.style.opacity = '1';
            produitsTitle.style.transform = 'translateY(0)';
        }, 200);
    }

    if (titleSeparator) {
        titleSeparator.style.opacity = '0';
        titleSeparator.style.transform = 'scaleX(0)';
        titleSeparator.style.transition = 'opacity 0.5s ease 0.4s, transform 0.5s ease 0.4s';

        setTimeout(() => {
            titleSeparator.style.opacity = '0.3';
            titleSeparator.style.transform = 'scaleX(1)';
        }, 600);
    }

    // ========================================
    // ANIMATION FILTRES (fade in)
    // ========================================
    const filtersRow = document.querySelector('.filters-row');

    if (filtersRow) {
        filtersRow.style.opacity = '0';
        filtersRow.style.transform = 'translateY(10px)';
        filtersRow.style.transition = 'opacity 0.5s ease 0.3s, transform 0.5s ease 0.3s';

        setTimeout(() => {
            filtersRow.style.opacity = '1';
            filtersRow.style.transform = 'translateY(0)';
        }, 500);
    }

    // ========================================
    // HOVER EFFECT SUR CARTES PRODUITS
    // ========================================
    produitCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 10px 30px rgba(0, 168, 232, 0.15)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
        });
    });

    // ========================================
    // DROPDOWN TRI - Changement visuel au select
    // ========================================
    const sortSelect = document.querySelector('.sort-dropdown select');

    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            // Petite animation de feedback
            this.parentElement.style.transform = 'scale(1.02)';
            setTimeout(() => {
                this.parentElement.style.transform = 'scale(1)';
            }, 150);

            // Ici vous pouvez ajouter la logique de tri réelle
            console.log('Tri sélectionné :', this.value);
        });
    }

    // ========================================
    // NAVIGATION GAMMES - Active state au clic
    // ========================================
    gammeCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Retire active de tous
            gammeCards.forEach(c => {
                c.classList.remove('active');
                c.querySelector('.gamme-name').style.color = 'var(--text-dark)';
            });
            // Ajoute active au cliqué
            this.classList.add('active');
            this.querySelector('.gamme-name').style.color = 'var(--blue-primary)';
        });
    });

});
/* ========================================
   ACTIVITES.JS - Animations page activités
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {

    // ========================================
    // ANIMATION APPARITION SECTIONS
    // ========================================
    const sections = document.querySelectorAll('.activite-section');

    const observerSections = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observerSections.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    sections.forEach(section => {
        observerSections.observe(section);
    });

    // ========================================
    // ANIMATION TITRE + SÉPARATEUR
    // ========================================
    const activitesTitle = document.querySelector('.activites-title h1');
    const titleSeparator = document.querySelector('.activites-title .title-separator');

    if (activitesTitle) {
        activitesTitle.style.opacity = '0';
        activitesTitle.style.transform = 'translateY(20px)';
        activitesTitle.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

        setTimeout(() => {
            activitesTitle.style.opacity = '1';
            activitesTitle.style.transform = 'translateY(0)';
        }, 200);
    }

    if (titleSeparator) {
        titleSeparator.style.opacity = '0';
        titleSeparator.style.transform = 'scaleX(0)';
        titleSeparator.style.transition = 'opacity 0.5s ease 0.4s, transform 0.5s ease 0.4s';

        setTimeout(() => {
            titleSeparator.style.opacity = '0.3';
            titleSeparator.style.transform = 'scaleX(1)';
        }, 600);
    }

    // ========================================
    // ANIMATION CARTES IRRIGATION
    // ========================================
    const irrigationCards = document.querySelectorAll('.irrigation-card');

    const observerCards = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observerCards.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    irrigationCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.15}s, transform 0.5s ease ${index * 0.15}s`;
        observerCards.observe(card);
    });

});