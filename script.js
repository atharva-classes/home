// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
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



// Contact Form Handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        standard: document.getElementById('standard').value,
        message: document.getElementById('message').value
    };

    // Validate form
    if (validateFormForWhatsApp(formData)) {
        // Create WhatsApp message
        const whatsappMessage = createWhatsAppMessage(formData);

        // Send to WhatsApp with proper encoding
        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappURL = `https://wa.me/917588696037?text=${encodedMessage}`;

        // Open WhatsApp in new tab
        window.open(whatsappURL, '_blank');

        // Show success message
        showNotification('Redirecting to WhatsApp to send your inquiry!', 'success');

        // Reset form after a short delay
        setTimeout(() => {
            contactForm.reset();
        }, 1000);
    }
});

// Create formatted WhatsApp message
function createWhatsAppMessage(formData) {
    // Format date as DD/MM/YYYY and time in 12-hour format
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const time = now.toLocaleTimeString('en-US', { 
        hour12: true, 
        hour: '2-digit', 
        minute: '2-digit'
    });
    const formattedDateTime = `${day}/${month}/${year}, ${time}`;

    let message = `New Inquiry - Atharva Classes\n\n`;
    message += `Student Name: ${formData.name}\n`;
    message += `Phone Number: ${formData.phone}\n`;
    message += `Standard: ${formData.standard}\n`;

    if (formData.message && formData.message.trim()) {
        message += `Message: ${formData.message}\n`;
    }

    message += `\nInquiry Time: ${formattedDateTime}\n`;
    message += `\nThank you for your interest in Atharva Classes!`;

    return message;
}

// Form validation for WhatsApp
function validateFormForWhatsApp(data) {
    if (!data.name.trim()) {
        showNotification('Please enter the student name.', 'error');
        return false;
    }

    if (!data.phone.trim() || !isValidPhone(data.phone)) {
        showNotification('Please enter a valid phone number.', 'error');
        return false;
    }

    if (!data.standard) {
        showNotification('Please select a standard.', 'error');
        return false;
    }

    return true;
}

// Keep original validation function for other uses
function validateForm(data) {
    if (!data.name.trim()) {
        showNotification('Please enter the student name.', 'error');
        return false;
    }

    if (!data.email.trim() || !isValidEmail(data.email)) {
        showNotification('Please enter a valid email address.', 'error');
        return false;
    }

    if (!data.phone.trim() || !isValidPhone(data.phone)) {
        showNotification('Please enter a valid phone number.', 'error');
        return false;
    }

    if (!data.standard) {
        showNotification('Please select a standard.', 'error');
        return false;
    }

    return true;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Phone validation (Indian format)
function isValidPhone(phone) {
    const phoneRegex = /^[+]?[0-9]{10,13}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Notification system
function showNotification(message, type) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 350px;
    `;

    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 10px;
    `;

    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        margin-left: auto;
    `;

    // Add to page
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-on-scroll');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.course-card, .feature-card, .feature-item, .about-text, .about-features');
    animateElements.forEach(el => observer.observe(el));
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Counter animation for stats
function animateCounter(element, target) {
    const duration = 2000;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    const originalText = element.textContent;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }

        if (originalText.includes('%')) {
            element.textContent = Math.floor(current) + '%';
        } else if (originalText.includes('+')) {
            element.textContent = Math.floor(current) + '+';
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-item h4');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const number = parseInt(text.replace(/[^\d]/g, ''));
                // Only animate if we have a valid number
                if (!isNaN(number) && number > 0) {
                    animateCounter(stat, number);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});

// Initialize AOS
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 120,
        delay: 100
    });

    // Initialize Mobile Testimonial Card Stack
    initializeMobileTestimonials();
    
    // Initialize New Mobile Testimonials
    initializeNewMobileTestimonials();
});

// Mobile Testimonial Card Stack Functionality
function initializeMobileTestimonials() {
    const cards = document.querySelectorAll('.mobile-testimonial-card');
    const dots = document.querySelectorAll('.mobile-nav-dot');
    let currentCard = 0;
    let autoPlayInterval;

    if (cards.length === 0) return; // Exit if no mobile testimonials found

    // Function to show specific card
    function showCard(index) {
        // Remove active class from all cards and dots
        cards.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Add active class to current card and dot
        if (cards[index]) {
            cards[index].classList.add('active');
        }
        if (dots[index]) {
            dots[index].classList.add('active');
        }

        currentCard = index;
    }

    // Function to go to next card
    function nextCard() {
        const next = (currentCard + 1) % cards.length;
        showCard(next);
    }

    // Function to go to previous card
    function prevCard() {
        const prev = (currentCard - 1 + cards.length) % cards.length;
        showCard(prev);
    }

    // Add click handlers to navigation dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showCard(index);
            resetAutoPlay();
        });
    });

    // Add click handlers to cards for easy navigation
    cards.forEach((card, index) => {
        card.addEventListener('click', () => {
            if (index !== currentCard) {
                showCard(index);
                resetAutoPlay();
            }
        });
    });

    // Auto-play functionality
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextCard, 4000); // Change card every 4 seconds
    }

    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
        }
    }

    function resetAutoPlay() {
        stopAutoPlay();
        startAutoPlay();
    }

    // Touch/Swipe functionality for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    const testimonialStack = document.getElementById('mobileTestimonialStack');

    if (testimonialStack) {
        testimonialStack.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoPlay();
        }, { passive: true });

        testimonialStack.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            resetAutoPlay();
        }, { passive: true });
    }

    function handleSwipe() {
        const swipeThreshold = 50;
        const swipeDistance = touchEndX - touchStartX;

        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                // Swipe right - go to previous card
                prevCard();
            } else {
                // Swipe left - go to next card
                nextCard();
            }
        }
    }

    // Pause auto-play when user hovers over the testimonial area
    const mobileTestimonials = document.querySelector('.mobile-testimonials-container');
    if (mobileTestimonials) {
        mobileTestimonials.addEventListener('mouseenter', stopAutoPlay);
        mobileTestimonials.addEventListener('mouseleave', startAutoPlay);
    }

    // Start auto-play
    startAutoPlay();

    // Intersection Observer to pause/resume when section is not in view
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startAutoPlay();
                } else {
                    stopAutoPlay();
                }
            });
        }, { threshold: 0.5 });

        if (mobileTestimonials) {
            observer.observe(mobileTestimonials);
        }
    }

    // Handle visibility change (tab switching)
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAutoPlay();
        } else {
            startAutoPlay();
        }
    });
}

// Back to Top Button functionality
const backToTopBtn = document.getElementById('backToTop');

// Show/hide back to top button based on scroll position
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

// Smooth scroll to top when button is clicked
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Premium Interactive Effects
class PremiumEffects {
    constructor() {
        this.init();
    }

    init() {
        this.createParticles();
        this.setupSpotlightEffect();
        this.addInteractiveElements();
    }

    createParticles() {
        const particlesContainer = document.getElementById('particles');
        const particleCount = 50;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';

            // Random size between 2-8px
            const size = Math.random() * 6 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;

            // Random horizontal position
            particle.style.left = `${Math.random() * 100}%`;

            // Random animation duration between 10-20s
            const duration = Math.random() * 10 + 10;
            particle.style.animationDuration = `${duration}s`;

            // Random delay
            const delay = Math.random() * 5;
            particle.style.animationDelay = `${delay}s`;

            particlesContainer.appendChild(particle);
        }
    }

    setupSpotlightEffect() {
        const hero = document.querySelector('.hero');
        const spotlight = document.getElementById('spotlightEffect');

        if (hero && spotlight) {
            hero.addEventListener('mousemove', (e) => {
                const rect = hero.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;

                spotlight.style.setProperty('--mouse-x', `${x}%`);
                spotlight.style.setProperty('--mouse-y', `${y}%`);
            });
        }
    }

    addInteractiveElements() {
        // Add tilt effect to cards
        const cards = document.querySelectorAll('.premium-card-hover');

        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        });

        // Add magnetic effect to buttons
        const buttons = document.querySelectorAll('.btn');

        buttons.forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.05)`;
            });

            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translate(0, 0) scale(1)';
            });
        });
    }
}

// Enhanced scroll effects
function addPremiumScrollEffects() {
    const elements = document.querySelectorAll('.premium-card-hover, .premium-glow');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';

                // Add staggered animation delay for cards in the same row
                const siblings = Array.from(entry.target.parentNode.children);
                const index = siblings.indexOf(entry.target);
                entry.target.style.animationDelay = `${index * 0.1}s`;
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
}

// Premium Loading Animation
window.addEventListener('load', () => {
    const loader = document.getElementById('premiumLoader');

    // Initialize premium effects
    new PremiumEffects();
    addPremiumScrollEffects();

    // Simulate loading time for premium effect
    setTimeout(() => {
        loader.classList.add('hidden');

        // Remove loader from DOM after animation
        setTimeout(() => {
            if (loader.parentNode) {
                loader.parentNode.removeChild(loader);
            }
        }, 800);

        // Add entrance animation to main content
        document.body.style.animation = 'fadeInPremium 1s ease-out';
    }, 2500);
});

// Premium entrance animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInPremium {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-placeholder');

    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    element.classList.remove('typing-complete');

    function type() {
        if (i < text.length) {
            if (text.charAt(i) === '<') {
                // Skip HTML tags
                let tagEnd = text.indexOf('>', i);
                if (tagEnd !== -1) {
                    element.innerHTML += text.slice(i, tagEnd + 1);
                    i = tagEnd + 1;
                }
            } else {
                element.innerHTML += text.charAt(i);
                i++;
            }
            setTimeout(type, speed);
        } else {
            // Typing complete, hide cursor after a short delay
            setTimeout(() => {
                element.classList.add('typing-complete');
            }, 2000);
        }
    }

    type();
}

// Testimonials Carousel
class TestimonialsCarousel {
    constructor() {
        this.track = document.getElementById('testimonialTrack');
        this.dots = document.querySelectorAll('.dot');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.currentSlide = 0;
        this.totalSlides = document.querySelectorAll('.testimonial-card').length;
        this.autoPlayInterval = null;

        this.init();
    }

    init() {
        if (!this.track) return;

        // Add event listeners
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());

        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });

        // Start auto-play
        this.startAutoPlay();

        // Pause auto-play on hover
        const carousel = document.querySelector('.testimonials-carousel');
        carousel.addEventListener('mouseenter', () => this.stopAutoPlay());
        carousel.addEventListener('mouseleave', () => this.startAutoPlay());

        // Touch/swipe support for mobile
        this.addTouchSupport();
    }

    goToSlide(slideIndex) {
        this.currentSlide = slideIndex;
        this.updateCarousel();
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateCarousel();
    }

    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.updateCarousel();
    }

    updateCarousel() {
        // Move track
        const translateX = -this.currentSlide * 100;
        this.track.style.transform = `translateX(${translateX}%)`;

        // Update dots
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });

        // Update buttons (keep enabled for infinite carousel)
        this.prevBtn.disabled = false;
        this.nextBtn.disabled = false;
    }

    startAutoPlay() {
        this.stopAutoPlay();
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    addTouchSupport() {
        let startX = 0;
        let startY = 0;
        let isDragging = false;
        let isHorizontalSwipe = false;

        this.track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            isDragging = true;
            isHorizontalSwipe = false;
            this.stopAutoPlay();
        }, { passive: true });

        this.track.addEventListener('touchmove', (e) => {
            if (!isDragging) return;

            const currentX = e.touches[0].clientX;
            const currentY = e.touches[0].clientY;
            const diffX = Math.abs(startX - currentX);
            const diffY = Math.abs(startY - currentY);

            // Determine if this is a horizontal swipe
            if (diffX > diffY && diffX > 10) {
                isHorizontalSwipe = true;
                e.preventDefault(); // Only prevent default for horizontal swipes
            } else if (diffY > diffX && diffY > 10) {
                // This is a vertical scroll, allow it
                isHorizontalSwipe = false;
                isDragging = false;
                this.startAutoPlay();
                return;
            }
        }, { passive: false });

        this.track.addEventListener('touchend', (e) => {
            if (!isDragging || !isHorizontalSwipe) {
                this.startAutoPlay();
                return;
            }

            const endX = e.changedTouches[0].clientX;
            const diffX = startX - endX;

            // Only trigger slide change for significant horizontal swipes
            if (Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }

            isDragging = false;
            isHorizontalSwipe = false;
            this.startAutoPlay();
        }, { passive: true });
    }
}



// Gallery and Lightbox functionality
class GalleryLightbox {
    constructor() {
        this.modal = document.getElementById('lightboxModal');
        this.closeBtn = document.querySelector('.lightbox-close');
        this.prevBtn = document.querySelector('.lightbox-prev');
        this.nextBtn = document.querySelector('.lightbox-next');
        this.lightboxTitle = document.getElementById('lightboxTitle');
        this.lightboxDescription = document.getElementById('lightboxDescription');
        this.currentImageIndex = 0;

        this.galleryData = {
            'learning-1': {
                title: 'Group Study Session',
                description: 'Students engaged in collaborative learning and group discussions, working together to solve problems and share knowledge.',
                image: './attached_assets/students-group-study.jpg'
            },
            'learning-2': {
                title: 'Classroom Learning',
                description: 'Students in focused classroom study environment, actively participating in lessons and taking notes.',
                image: './attached_assets/students-classroom-study.jpg'
            },
            'learning-3': {
                title: 'Focused Learning',
                description: 'Students concentrated in intensive study sessions, developing deep understanding of concepts through dedicated practice.',
                image: './attached_assets/students-focused-learning.jpg'
            }
        };

        this.imageKeys = Object.keys(this.galleryData);
        this.init();
    }

    init() {
        // Add click listeners to gallery view buttons
        document.querySelectorAll('.gallery-view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const imageKey = btn.getAttribute('data-image');
                this.openLightbox(imageKey);
            });
        });

        // Add click listeners to gallery cards
        document.querySelectorAll('.gallery-card').forEach(card => {
            card.addEventListener('click', () => {
                const btn = card.querySelector('.gallery-view-btn');
                const imageKey = btn.getAttribute('data-image');
                this.openLightbox(imageKey);
            });
        });

        // Close button
        this.closeBtn.addEventListener('click', () => this.closeLightbox());

        // Navigation buttons
        this.prevBtn.addEventListener('click', () => this.previousImage());
        this.nextBtn.addEventListener('click', () => this.nextImage());

        // Close on overlay click
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeLightbox();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.modal.classList.contains('active')) {
                switch(e.key) {
                    case 'Escape':
                        this.closeLightbox();
                        break;
                    case 'ArrowLeft':
                        this.previousImage();
                        break;
                    case 'ArrowRight':
                        this.nextImage();
                        break;
                }
            }
        });
    }

    openLightbox(imageKey) {
        const data = this.galleryData[imageKey];
        this.currentImageIndex = this.imageKeys.indexOf(imageKey);

        this.updateLightboxContent(data);
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeLightbox() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    previousImage() {
        this.currentImageIndex = (this.currentImageIndex - 1 + this.imageKeys.length) % this.imageKeys.length;
        const imageKey = this.imageKeys[this.currentImageIndex];
        const data = this.galleryData[imageKey];
        this.updateLightboxContent(data);
    }

    nextImage() {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.imageKeys.length;
        const imageKey = this.imageKeys[this.currentImageIndex];
        const data = this.galleryData[imageKey];
        this.updateLightboxContent(data);
    }

    updateLightboxContent(data) {
        this.lightboxTitle.textContent = data.title;
        this.lightboxDescription.textContent = data.description;

        // Update the lightbox image
        const lightboxImage = document.querySelector('.lightbox-image');
        if (data.image) {
            lightboxImage.innerHTML = `
                <img src="${data.image}" alt="${data.title}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 10px;">
            `;
        } else {
            // Fallback to placeholder if no image
            lightboxImage.innerHTML = `
                <div class="lightbox-placeholder">
                    <i class="fas fa-image"></i>
                    <h3>${data.title}</h3>
                    <p>${data.description}</p>
                </div>
            `;
        }
    }
}

// New Mobile Testimonials Swiper Functionality
function initializeNewMobileTestimonials() {
    const wrapper = document.getElementById('mobileTestimonialWrapper');
    const dots = document.querySelectorAll('.mobile-nav-dot-new');
    const container = document.querySelector('.mobile-testimonials-new');
    const prevBtn = document.getElementById('mobilePrevBtn');
    const nextBtn = document.getElementById('mobileNextBtn');
    
    if (!wrapper || dots.length === 0) return;
    
    let currentSlide = 0;
    const totalSlides = document.querySelectorAll('.mobile-testimonial-slide').length;
    let autoPlayInterval;
    let isInteracting = false;

    // Function to go to specific slide
    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        const translateX = -currentSlide * 100;
        wrapper.style.transform = `translateX(${translateX}%)`;

        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });

        // Update button states (for non-infinite carousel feel)
        if (prevBtn) {
            prevBtn.disabled = currentSlide === 0;
        }
        if (nextBtn) {
            nextBtn.disabled = currentSlide === totalSlides - 1;
        }
    }

    // Function to go to next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        goToSlide(currentSlide);
    }

    // Function to go to previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        goToSlide(currentSlide);
    }

    // Add click listeners to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            markAsInteracted();
            resetAutoPlay();
        });
    });

    // Add click listeners to navigation buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            markAsInteracted();
            resetAutoPlay();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            markAsInteracted();
            resetAutoPlay();
        });
    }

    // Touch/Swipe functionality
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;
    let isDragging = false;

    wrapper.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        isDragging = true;
        stopAutoPlay();
        markAsInteracted();
    }, { passive: true });

    wrapper.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        
        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;
        const diffX = Math.abs(touchStartX - currentX);
        const diffY = Math.abs(touchStartY - currentY);

        // If horizontal swipe is more significant than vertical, prevent default
        if (diffX > diffY && diffX > 10) {
            e.preventDefault();
        }
    }, { passive: false });

    wrapper.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        
        touchEndX = e.changedTouches[0].clientX;
        touchEndY = e.changedTouches[0].clientY;
        
        const swipeThreshold = 50;
        const swipeDistanceX = touchStartX - touchEndX;
        const swipeDistanceY = Math.abs(touchStartY - touchEndY);

        // Only trigger slide change for horizontal swipes
        if (Math.abs(swipeDistanceX) > swipeThreshold && Math.abs(swipeDistanceX) > swipeDistanceY) {
            if (swipeDistanceX > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }

        isDragging = false;
        resetAutoPlay();
    }, { passive: true });

    // Auto-play functionality
    function startAutoPlay() {
        stopAutoPlay();
        autoPlayInterval = setInterval(nextSlide, 4000);
    }

    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
    }

    function resetAutoPlay() {
        stopAutoPlay();
        setTimeout(startAutoPlay, 1000); // Wait 1 second before restarting
    }

    function markAsInteracted() {
        if (!isInteracting) {
            isInteracting = true;
            if (container) {
                container.classList.add('interacted');
            }
        }
    }

    // Pause auto-play when section is not in view
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    resetAutoPlay();
                } else {
                    stopAutoPlay();
                }
            });
        }, { threshold: 0.3 });

        if (container) {
            observer.observe(container);
        }
    }

    // Handle visibility change (tab switching)
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAutoPlay();
        } else if (container && isElementInViewport(container)) {
            resetAutoPlay();
        }
    });

    // Helper function to check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Start auto-play
    startAutoPlay();
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        // Start typing effect after a short delay
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 100);
        }, 1500);
    }

    // Initialize testimonials carousel
    new TestimonialsCarousel();

    // Initialize gallery lightbox
    new GalleryLightbox();
});