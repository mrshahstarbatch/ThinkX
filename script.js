document.addEventListener('DOMContentLoaded', function() {
    // Loading animation
    const loadingChars = document.querySelectorAll('.loading-char');
    loadingChars.forEach((char, index) => {
        setTimeout(() => {
            char.style.opacity = '1';
            char.style.transform = 'translateY(0)';
        }, index * 100);
    });

    // Remove loading screen
    setTimeout(() => {
        document.querySelector('.loading-screen').style.opacity = '0';
        setTimeout(() => {
            document.querySelector('.loading-screen').style.display = 'none';
            initApp();
        }, 1000);
    }, 3000);

    function initApp() {
        // Initialize Locomotive Scroll
        const scroll = new LocomotiveScroll({
            el: document.querySelector('[data-scroll-container]'),
            smooth: true,
            smartphone: {
                smooth: true
            },
            tablet: {
                smooth: true
            }
        });

        // Update scroll when content changes
        scroll.update();

        // Cursor effects
        const cursorCircle = document.querySelector('.cursor-circle');
        const cursorDot = document.querySelector('.cursor-dot');
        const hoverElements = document.querySelectorAll('a, button, .service-card, .partner-logo, .nav-link');

        // Move cursor
        document.addEventListener('mousemove', (e) => {
            cursorCircle.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
            cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        });

        // Cursor hover effects
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorCircle.style.width = '50px';
                cursorCircle.style.height = '50px';
                cursorCircle.style.backgroundColor = 'rgba(108, 99, 255, 0.2)';
            });
            el.addEventListener('mouseleave', () => {
                cursorCircle.style.width = '30px';
                cursorCircle.style.height = '30px';
                cursorCircle.style.backgroundColor = 'transparent';
            });
        });

        // Magnetic button effect
        const magneticBtns = document.querySelectorAll('.magnetic-btn');
        magneticBtns.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const distanceX = x - centerX;
                const distanceY = y - centerY;
                
                gsap.to(btn, {
                    x: distanceX * 0.2,
                    y: distanceY * 0.2,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            });

            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, {
                    x: 0,
                    y: 0,
                    duration: 0.5,
                    ease: 'elastic.out(1, 0.5)'
                });
            });
        });

        // Animate hero elements
        gsap.to('.title-word', {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 1,
            ease: 'power3.out',
            delay: 0.5
        });

        gsap.to('.title-asterisk', {
            rotation: 360,
            duration: 2,
            ease: 'elastic.out(1, 0.5)',
            delay: 1.5
        });

        gsap.to('.highlight-underline', {
            scaleX: 1,
            duration: 1,
            ease: 'power3.out',
            delay: 2
        });

        gsap.to('.hero-subtitle', {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            delay: 2.5
        });

        gsap.to('.hero-cta', {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            delay: 3
        });

        gsap.to('.scroll-text', {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            delay: 3.5
        });

        gsap.to('.scroll-line', {
            scaleY: 1,
            opacity: 1,
            duration: 1.5,
            ease: 'power3.out',
            delay: 4
        });

        // Animate service cards on scroll
        gsap.utils.toArray('.service-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                delay: i * 0.1,
                ease: 'power3.out'
            });
        });

        // Animate stats counting
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000;
            const start = 0;
            const increment = target / (duration / 16);
            let current = start;
            
            const timer = setInterval(() => {
                current += increment;
                stat.textContent = Math.floor(current);
                
                if (current >= target) {
                    stat.textContent = target;
                    clearInterval(timer);
                }
            }, 16);
        });

        // Testimonial slider
        const sliderTrack = document.querySelector('.slider-track');
        const slides = document.querySelectorAll('.testimonial-slide');
        const prevBtn = document.querySelector('.slider-prev');
        const nextBtn = document.querySelector('.slider-next');
        let currentIndex = 0;
        
        function updateSlider() {
            sliderTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            // Update pagination
            document.querySelectorAll('.slider-dot').forEach((dot, index) => {
                if (index === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
        
        // Create pagination dots
        const pagination = document.querySelector('.slider-pagination');
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateSlider();
            });
            pagination.appendChild(dot);
        });
        
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateSlider();
        });
        
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlider();
        });

        // Auto-rotate slides
        setInterval(() => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlider();
        }, 5000);

        // Mobile menu toggle
        const hamburger = document.querySelector('.nav-hamburger');
        const navLinks = document.querySelector('.nav-links');
        
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Initialize particle network
        particlesJS('particle-network', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#6c63ff"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 2,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#6c63ff",
                    "opacity": 0.2,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 1,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": true,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 0.5
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }
});
