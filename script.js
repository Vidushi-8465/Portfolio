/**
 * Portfolio Website - Main JavaScript
 * Handles navigation, animations, and interactions
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // Smooth Scrolling for Navigation
    // ============================================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ============================================
    // Mobile Menu Toggle
    // ============================================
    window.toggleMenu = function() {
        const menu = document.getElementById('mobileMenu');
        menu.classList.toggle('active');
    };

    // ============================================
    // Typewriter Effect for Hero Role
    // ============================================
    const roleElement = document.querySelector('.text-role');

    if (roleElement) {
        const roles = [
            "Oracle Certified Generative AI Professional", 
            "AI/ML Intern",
            "Frontend Developer",
            "Building AI Agents",
            "RAG Learner",
            "LLM Enthusiast",
            "DevOps Explorer"
        ];

        let roleIndex = 0;
        let charIndex = 0;
        let deleting = false;

        const baseTypeSpeed = 70;
        const baseDeleteSpeed = 60;
        const holdTime = 1400;

        function typeRole() {
            const current = roles[roleIndex];
            const length = current.length;

            if (!deleting) {
                charIndex++;
                roleElement.textContent = current.slice(0, charIndex);

                if (charIndex === current.length) {
                    deleting = true;
                    setTimeout(typeRole, holdTime);
                    return;
                }
            } else {
                charIndex--;
                roleElement.textContent = current.slice(0, charIndex);

                if (charIndex === 0) {
                    deleting = false;
                    roleIndex = (roleIndex + 1) % roles.length;
                }
            }

            const progress = Math.max(0, Math.min(1, charIndex / length || 0.001));
            const easeInOut = progress < 0.5
                ? 2 * progress * progress
                : -1 + (4 - 2 * progress) * progress;

            const typedDelay = baseTypeSpeed + (1 - easeInOut) * 80;
            const deleteDelay = baseDeleteSpeed + (1 - easeInOut) * 60;

            setTimeout(typeRole, deleting ? deleteDelay : typedDelay);
        }

        typeRole();
    }

    // ============================================
    // Contact Form Handling
    // ============================================
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const statusMsg = document.getElementById('status-message');
            statusMsg.textContent = 'Sending message...';
            statusMsg.style.color = 'var(--accent-cyan)';
            
            // Simulate form submission
            setTimeout(() => {
                statusMsg.textContent = 'Message sent successfully! ✅';
                statusMsg.style.color = '#4ade80';
                contactForm.reset();
                
                setTimeout(() => {
                    statusMsg.textContent = '';
                }, 5000);
            }, 1000);
        });
    }

    // ============================================
    // Intersection Observer for Scroll Animations
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // ============================================
    // Navbar Scroll Effect
    // ============================================
    let lastScroll = 0;
    const navbar = document.querySelector('nav');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.style.boxShadow = 'none';
            return;
        }
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        }
        
        lastScroll = currentScroll;
    });

    // ============================================
    // Active Navigation Link
    // ============================================
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // ============================================
    // Scroll Reveal for Elements
    // ============================================
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in');
            }
        });
    }, {
        threshold: 0.15
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    console.log('Portfolio initialized successfully! 🚀');
});