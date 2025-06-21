// Set the date for countdown - July 20, 2025
const weddingDate = new Date('July 20, 2025 14:00:00').getTime();

// Update the countdown every second
const countdownInterval = setInterval(function() {
    // Get today's date and time
    const now = new Date().getTime();
    
    // Find the distance between now and the wedding date
    const timeRemaining = weddingDate - now;
    
    // Time calculations for days, hours, minutes and seconds
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
    
    // Display the results - check if elements exist before updating
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    if (daysElement) daysElement.textContent = days;
    if (hoursElement) hoursElement.textContent = hours;
    if (minutesElement) minutesElement.textContent = minutes;
    if (secondsElement) secondsElement.textContent = seconds;
    
    // If the countdown is over, display a message
    if (timeRemaining < 0) {
        clearInterval(countdownInterval);
        if (daysElement) daysElement.textContent = '0';
        if (hoursElement) hoursElement.textContent = '0';
        if (minutesElement) minutesElement.textContent = '0';
        if (secondsElement) secondsElement.textContent = '0';
    }
}, 1000);

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    // FAQ Dropdown functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', () => {
                // Toggle active class on the clicked item
                item.classList.toggle('active');
                
                // Close other open FAQs
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
            });
        }
    });

    // Smooth scrolling for navigation
    const anchors = document.querySelectorAll('a[href^="#"]');
    
    anchors.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Only process if the href isn't just "#"
            if(this.getAttribute('href') && this.getAttribute('href').length > 1) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const target = document.querySelector(targetId);
                
                if(target) {
                    // Use smooth scroll with fallback for older browsers
                    if ('scrollBehavior' in document.documentElement.style) {
                        target.scrollIntoView({
                            behavior: 'smooth'
                        });
                    } else {
                        // Fallback for browsers that don't support smooth scrolling
                        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            }
        });
    });

    // RSVP button functionality
    const rsvpButton = document.querySelector('.rsvp-button');
    
    if(rsvpButton) {
        rsvpButton.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default action
            alert('Thank you for your RSVP! We look forward to celebrating with you.');
            // In a real implementation, this would open a form or link to an RSVP service
        });
    }
    
    // Add touch support for mobile devices
    addTouchSupport();
});

// Simple animation for the monogram with performance optimization
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

window.addEventListener('scroll', debounce(function() {
    const monogram = document.querySelector('.monogram');
    if(monogram) {
        // Use requestAnimationFrame for smoother animations
        requestAnimationFrame(() => {
            const scrollPosition = window.scrollY;
            // Limit the animation effect to avoid excessive movement on mobile
            const translateY = Math.min(scrollPosition * 0.2, 50);
            monogram.style.transform = `translateY(${translateY}px)`;
        });
    }
}));

// Add touch support for mobile devices
function addTouchSupport() {
    // Handle touch events for interactive elements
    const interactiveElements = document.querySelectorAll('.faq-question, .map-button, .rsvp-button');
    
    interactiveElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.classList.add('touch-active');
        }, {passive: true});
        
        element.addEventListener('touchend', function() {
            this.classList.remove('touch-active');
        }, {passive: true});
    });
    
    // Add fast-click to eliminate 300ms delay on mobile devices
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
        
        // Optional: Add a helper function to reduce touch delay
        document.addEventListener('touchstart', function(){}, {passive: true});
    }
}

// Check for viewport changes (orientation change on mobile)
window.addEventListener('resize', debounce(function() {
    // Handle any responsive UI adjustments if needed
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
        // Apply mobile-specific adjustments if needed
        document.body.classList.add('mobile-view');
    } else {
        document.body.classList.remove('mobile-view');
    }
}));

// Detect if the user is on a mobile device and adjust functionality accordingly
function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
}

// Apply mobile-specific enhancements if needed
if (isMobileDevice()) {
    document.addEventListener('DOMContentLoaded', function() {
        document.body.classList.add('mobile-device');
        
        // Optimize any heavy animations for mobile
        const heavyAnimationElements = document.querySelectorAll('.header-image, .floral-decoration');
        heavyAnimationElements.forEach(element => {
            element.classList.add('mobile-optimized');
        });
    });
}