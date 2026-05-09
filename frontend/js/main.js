/* ============================================
   EDUVAULT - MAIN JAVASCRIPT
   ============================================ */

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile Menu Toggle
if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close menu when link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu?.classList.remove('active');
        hamburger?.classList.remove('active');
    });
});

// Smooth Scroll Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Active Link on Scroll
function setActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

setActiveLink();

// Animated Counter
function animateCounter() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    let hasRun = false;

    function runCounter() {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const increment = target / speed;
            let current = 0;

            const updateCount = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCount);
                } else {
                    counter.textContent = target + '+';
                }
            };

            updateCount();
        });
    }

    // Run counter when section is in view
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !hasRun) {
            runCounter();
            hasRun = true;
        }
    });

    const statsSection = document.querySelector('.statistics');
    if (statsSection) {
        observer.observe(statsSection);
    }
}

animateCounter();

// Intersection Observer for Scroll Reveal
function setupScrollReveal() {
    const revealElements = document.querySelectorAll(
        '.overview-card, .feature-card, .service-item, .testimonial-card, .stat-box'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideUp 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => observer.observe(el));
}

setupScrollReveal();

// Parallax Effect
window.addEventListener('scroll', () => {
    const parallaxElements = document.querySelectorAll('.floating-card');
    parallaxElements.forEach(element => {
        let scrollPosition = window.pageYOffset;
        element.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    });
});

// Page Scroll Progress
function showScrollProgress() {
    const scroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (scroll / height) * 100;

    // You can use this to update a progress bar if needed
}

window.addEventListener('scroll', showScrollProgress);

// FAQ Accordion
function setupFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        if (question) {
            question.addEventListener('click', () => {
                const isOpen = item.classList.contains('open');

                // Close all other items
                faqItems.forEach(i => {
                    i.classList.remove('open');
                    const a = i.querySelector('.faq-answer');
                    if (a) a.style.maxHeight = '0';
                });

                // Toggle current item
                if (!isOpen) {
                    item.classList.add('open');
                    if (answer) answer.style.maxHeight = answer.scrollHeight + 'px';
                }
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', setupFAQ);

// Load Resources Dynamically
function loadResources() {
    const resourcesGrid = document.getElementById('resourcesGrid');
    if (!resourcesGrid) return;

    // Sample data - replace with actual API call
    const resources = [
        {
            id: 1,
            title: 'C Programming',
            branch: 'cse',
            semester: '1',
            type: 'PDF',
            downloads: 1250,
            icon: 'fa-file-pdf'
        },
        {
            id: 2,
            title: 'Data Structures Lab Manual',
            branch: 'cse',
            semester: '2',
            type: 'Lab Manual',
            downloads: 890,
            icon: 'fa-book'
        },
        {
            id: 3,
            title: 'Database Management Systems',
            branch: 'cse',
            semester: '5',
            type: 'Notes',
            downloads: 2150,
            icon: 'fa-sticky-note'
        },
        {
            id: 4,
            title: 'Engineering Mechanics',
            branch: 'mechanical',
            semester: '1',
            type: 'PDF',
            downloads: 1540,
            icon: 'fa-file-pdf'
        },
        {
            id: 5,
            title: 'Circuit Theory',
            branch: 'electrical',
            semester: '2',
            type: 'PDF',
            downloads: 1120,
            icon: 'fa-file-pdf'
        },
        {
            id: 6,
            title: 'Signals and Systems',
            branch: 'ece',
            semester: '3',
            type: 'Lab Manual',
            downloads: 980,
            icon: 'fa-book'
        }
    ];

    function displayResources(resourcesToShow) {
        if (resourcesToShow.length === 0) {
            resourcesGrid.innerHTML = '<p class="no-results">No resources found. Try different filters.</p>';
            return;
        }

        resourcesGrid.innerHTML = resourcesToShow.map(resource => `
            <div class="resource-card glass-card hover-glow">
                <div class="resource-icon">
                    <i class="fas ${resource.icon}"></i>
                </div>
                <h3>${resource.title}</h3>
                <div class="resource-meta">
                    <span class="resource-type">${resource.type}</span>
                    <span class="resource-semester">Sem ${resource.semester}</span>
                </div>
                <p class="resource-downloads">
                    <i class="fas fa-eye"></i> ${resource.downloads} views
                </p>
                <a href="viewer.html?id=${resource.id}" class="resource-link">
                    View Resource <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        `).join('');
    }

    // Filter functionality
    const branchFilter = document.getElementById('branchFilter');
    const semesterFilter = document.getElementById('semesterFilter');
    const searchInput = document.getElementById('searchInput');

    function applyFilters() {
        const branch = branchFilter?.value || '';
        const semester = semesterFilter?.value || '';
        const search = searchInput?.value.toLowerCase() || '';

        const filtered = resources.filter(resource => {
            const matchBranch = !branch || resource.branch === branch;
            const matchSemester = !semester || resource.semester === semester;
            const matchSearch = !search || resource.title.toLowerCase().includes(search);
            return matchBranch && matchSemester && matchSearch;
        });

        displayResources(filtered);
    }

    // Event listeners for filters
    if (branchFilter) branchFilter.addEventListener('change', applyFilters);
    if (semesterFilter) semesterFilter.addEventListener('change', applyFilters);
    if (searchInput) searchInput.addEventListener('input', applyFilters);

    // Initial load
    displayResources(resources);
}

document.addEventListener('DOMContentLoaded', loadResources);

// Mouse Follow Effect
document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    // Can be used for parallax or other effects
});

// Prevent Common Security Issues
function setupSecurityMeasures() {
    // Disable right-click
    document.addEventListener('contextmenu', (e) => {
        // Allow context menu on links and form elements
        if (e.target.tagName !== 'A' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
            // e.preventDefault();
        }
    });

    // Disable F12 (Developer Tools)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'F12') {
            e.preventDefault();
        }
    });

    // Disable Ctrl+U (View Source)
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'u') {
            e.preventDefault();
        }
    });
}

setupSecurityMeasures();

// Loading Animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Console Message
console.log('%c EduVault - Secure Educational Platform', 'color: #00d4ff; font-size: 16px; font-weight: bold;');
console.log('%c Made with ❤️ by SHAIK LALU BASHA', 'color: #a300d4; font-size: 12px;');
