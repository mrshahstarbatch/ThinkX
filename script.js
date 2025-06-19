document.addEventListener('DOMContentLoaded', function() {
    // Initialize GSAP
    gsap.registerPlugin(ScrollTrigger);
    
    // Cursor effect
    const cursor = document.querySelector('.cursor');
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.5,
            ease: 'power2.out'
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
    gsap.from('.hero-title', {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: 'power3.out'
    });
    
    gsap.to('.highlight-underline', {
        scaleX: 1,
        duration: 1,
        delay: 1,
        ease: 'power3.out'
    });
    
    gsap.from('.hero-subtitle', {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 1.5,
        ease: 'power3.out'
    });
    
    gsap.from('.hero-cta', {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 2,
        ease: 'power3.out'
    });
    
    // Animate floating boxes on scroll
    gsap.utils.toArray('.floating-text-box, .floating-image-box, .floating-card').forEach((box, i) => {
        gsap.from(box, {
            y: 100,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.1,
            scrollTrigger: {
                trigger: box,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
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
        
        ScrollTrigger.create({
            trigger: stat,
            start: 'top 80%',
            onEnter: () => {
                const timer = setInterval(() => {
                    current += increment;
                    stat.textContent = Math.floor(current);
                    
                    if (current >= target) {
                        stat.textContent = target;
                        clearInterval(timer);
                    }
                }, 16);
            },
            once: true
        });
    });
    
    // Testimonial slider
    const sliderTrack = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentIndex = 0;
    
    function updateSlider() {
        gsap.to(sliderTrack, {
            x: `-${currentIndex * 100}%`,
            duration: 0.6,
            ease: 'power2.inOut'
        });
        
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
        const dot = document.createElement('span');
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
    
    // Hover effects for boxes
    const floatingBoxes = document.querySelectorAll('.floating-text-box, .floating-card');
    floatingBoxes.forEach(box => {
        box.addEventListener('mousemove', (e) => {
            const rect = box.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const distanceX = x - centerX;
            const distanceY = y - centerY;
            
            gsap.to(box, {
                rotationY: distanceX * 0.05,
                rotationX: -distanceY * 0.05,
                transformPerspective: 1000,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
        
        box.addEventListener('mouseleave', () => {
            gsap.to(box, {
                rotationY: 0,
                rotationX: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.5)'
            });
        });
    });
});
