// Smooth scroll animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate language skill cards with stagger
            if (entry.target.id === 'skills') {
                const cards = entry.target.querySelectorAll('.skills-grid .skill-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('visible');
                    }, index * 200);
                });
            }

            // Reveal tool cards all at once
            if (entry.target.classList.contains('tools-grid')) {
                entry.target.querySelectorAll('.skill-card').forEach(card => {
                    card.classList.add('visible');
                });
            }
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Observe cards
document.querySelectorAll('.card').forEach(card => {
    observer.observe(card);
});

// Observe tools grid
document.querySelectorAll('.tools-grid').forEach(grid => {
    observer.observe(grid);
});

// Scroll progress bar
window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    document.querySelector('.progress-bar').style.width = scrolled + '%';
});

// Navigation background on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile menu functionality
function showSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const body = document.body;
    
    sidebar.classList.add('active');
    overlay.classList.add('active');
    body.style.overflow = 'hidden'; // Prevent scrolling when sidebar is open
}

function hideSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const body = document.body;
    
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
    body.style.overflow = ''; // Restore scrolling
}

// Open a project's data-link on click ("#" is the placeholder until a URL is set)
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', function() {
        const link = this.dataset.link;
        if (link && link !== '#') {
            window.open(link, '_blank', 'noopener');
        }
    });
});

// Parallax effect for hero section (optional enhancement)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add typing effect for hero text (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        // Uncomment the line below to enable typing effect
        // typeWriter(heroTitle, originalText, 100);
    }
});

// Add smooth reveal animation for contact items
const contactObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const contactItems = entry.target.querySelectorAll('.contact-item');
            contactItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 150);
            });
        }
    });
}, { threshold: 0.3 });

// Observe contact section
const contactSection = document.querySelector('#contact');
if (contactSection) {
    contactObserver.observe(contactSection);
}