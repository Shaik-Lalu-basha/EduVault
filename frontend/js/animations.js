/* ============================================
   EDUVAULT - ANIMATIONS JAVASCRIPT
   ============================================ */

// Scroll Reveal Animation
class ScrollReveal {
    constructor(options = {}) {
        this.elements = [];
        this.options = {
            duration: options.duration || 600,
            delay: options.delay || 0,
            distance: options.distance || 30,
            origin: options.origin || 'bottom',
            threshold: options.threshold || 0.1,
            ...options
        };
        this.observer = new IntersectionObserver(this.observe.bind(this), {
            threshold: this.options.threshold
        });
    }

    observe(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                this.animateElement(entry.target);
                this.observer.unobserve(entry.target);
            }
        });
    }

    animateElement(element) {
        const delay = element.dataset.delay || this.options.delay;
        const duration = element.dataset.duration || this.options.duration;

        element.style.animationDelay = `${delay}ms`;
        element.style.animationDuration = `${duration}ms`;
        element.classList.add('revealed');
    }

    reveal(elements) {
        if (typeof elements === 'string') {
            this.elements = Array.from(document.querySelectorAll(elements));
        } else if (elements instanceof NodeList) {
            this.elements = Array.from(elements);
        } else if (Array.isArray(elements)) {
            this.elements = elements;
        }

        this.elements.forEach(el => {
            this.observer.observe(el);
        });
    }
}

// Initialize Scroll Reveal
document.addEventListener('DOMContentLoaded', function () {
    const sr = new ScrollReveal({
        duration: 600,
        distance: 30,
        threshold: 0.1
    });

    // Reveal elements
    sr.reveal('.overview-card');
    sr.reveal('.feature-card');
    sr.reveal('.service-item');
    sr.reveal('.testimonial-card');
    sr.reveal('.stat-box');
    sr.reveal('.reason-card');
    sr.reveal('.tech-category');
    sr.reveal('.security-card');
    sr.reveal('.about-content');
    sr.reveal('.vm-card');
    sr.reveal('.info-card');
    sr.reveal('.faq-item');
});

// Parallax Mouse Movement
class ParallaxMouse {
    constructor() {
        this.setup();
    }

    setup() {
        document.addEventListener('mousemove', (e) => {
            this.handleParallax(e);
        });
    }

    handleParallax(e) {
        const cards = document.querySelectorAll('.floating-card');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        cards.forEach(card => {
            const moveX = (x - 0.5) * 20;
            const moveY = (y - 0.5) * 20;
            card.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    }
}

// Initialize Parallax
if (document.querySelector('.floating-card')) {
    new ParallaxMouse();
}

// Typing Animation
class TypingAnimation {
    constructor(element, text, speed = 50) {
        this.element = element;
        this.text = text;
        this.speed = speed;
        this.index = 0;
    }

    start() {
        this.element.innerHTML = '';
        this.type();
    }

    type() {
        if (this.index < this.text.length) {
            this.element.innerHTML += this.text.charAt(this.index);
            this.index++;
            setTimeout(() => this.type(), this.speed);
        }
    }
}

// Initialize Typing Animation
document.addEventListener('DOMContentLoaded', function () {
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const text = typingElement.textContent;
        typingElement.textContent = '';
        const typing = new TypingAnimation(typingElement, text, 50);
        typing.start();
    }
});

// Counter Animation
class Counter {
    constructor(element, target) {
        this.element = element;
        this.target = parseInt(target);
        this.current = 0;
        this.increment = this.target / 100;
    }

    start() {
        this.updateCounter();
    }

    updateCounter() {
        if (this.current < this.target) {
            this.current += this.increment;
            this.element.textContent = Math.ceil(this.current) + '+';
            requestAnimationFrame(() => this.updateCounter());
        } else {
            this.element.textContent = this.target + '+';
        }
    }
}

// Hover Lift Effect
class HoverLift {
    constructor() {
        this.setupHoverEffects();
    }

    setupHoverEffects() {
        const cards = document.querySelectorAll('.hover-glow, .feature-card, .service-item');
        cards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
                card.classList.add('hover-active');
            });

            card.addEventListener('mouseleave', () => {
                card.classList.remove('hover-active');
            });
        });
    }
}

// Initialize Hover Lift
document.addEventListener('DOMContentLoaded', function () {
    new HoverLift();
});

// Scroll Progress Bar
class ScrollProgress {
    constructor() {
        this.progressBar = document.createElement('div');
        this.progressBar.className = 'scroll-progress';
        document.body.appendChild(this.progressBar);
        this.setupListeners();
    }

    setupListeners() {
        window.addEventListener('scroll', () => {
            this.updateProgress();
        });
    }

    updateProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (scrollTop / docHeight) * 100;
        this.progressBar.style.width = scrolled + '%';
    }
}

// Initialize Scroll Progress
if (document.body) {
    new ScrollProgress();
}

// Add scroll progress bar styles
const style = document.createElement('style');
style.innerHTML = `
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #00d4ff, #a300d4);
        width: 0%;
        z-index: 9999;
        transition: width 0.1s ease;
        box-shadow: 0 0 15px rgba(0, 212, 255, 0.5);
    }
`;
document.head.appendChild(style);

// Smooth Scroll Behavior
document.documentElement.style.scrollBehavior = 'smooth';

// Page Transition Animation
window.addEventListener('beforeunload', function () {
    document.body.style.opacity = '0.5';
});

// Fade in on load
window.addEventListener('load', function () {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
});
