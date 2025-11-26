document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Back to top button
    const backToTopButton = document.createElement('div');
    backToTopButton.className = 'back-to-top';
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTopButton);

    // Show/hide back to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    // Smooth scroll to top
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Pause animation on hover for better UX
    const techCarousel = document.querySelector('.tech-carousel');
    const techTrack = document.querySelector('.tech-track');
    
    if (techCarousel && techTrack) {
        let isPaused = false;
        let animationId;
        let scrollPosition = 0;
        const scrollSpeed = 1; // Pixels per frame
        
        // Clone items for infinite effect
        function cloneItems() {
            const items = document.querySelectorAll('.tech-item');
            const itemsArray = Array.from(items);
            const firstFiveItems = itemsArray.slice(0, 10); // Clone first 10 items
            
            firstFiveItems.forEach(item => {
                const clone = item.cloneNode(true);
                techTrack.appendChild(clone);
            });
        }
        
        // Initialize carousel
        function initCarousel() {
            // Disable default animation
            techTrack.style.animation = 'none';
            
            // Start custom animation
            function animate() {
                if (!isPaused) {
                    scrollPosition += scrollSpeed;
                    techTrack.style.transform = `translateX(-${scrollPosition}px)`;
                    
                    // Reset position when reaching the end of the track
                    const trackWidth = techTrack.scrollWidth / 2;
                    if (scrollPosition >= trackWidth) {
                        scrollPosition = 0;
                    }
                }
                animationId = requestAnimationFrame(animate);
            }
            
            // Start animation
            animate();
            
            // Pause on hover
            techCarousel.addEventListener('mouseenter', () => {
                isPaused = true;
            });
            
            techCarousel.addEventListener('mouseleave', () => {
                isPaused = false;
            });
            
            // Touch events for mobile
            let touchStartX = 0;
            let touchEndX = 0;
            
            techCarousel.addEventListener('touchstart', (e) => {
                touchStartX = e.touches[0].clientX;
                isPaused = true;
            }, { passive: true });
            
            techCarousel.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].clientX;
                handleSwipe();
                
                // Resume after a delay
                setTimeout(() => {
                    isPaused = false;
                }, 2000);
            }, { passive: true });
            
            function handleSwipe() {
                const swipeThreshold = 50;
                const swipeDistance = touchEndX - touchStartX;
                
                if (Math.abs(swipeDistance) > swipeThreshold) {
                    if (swipeDistance > 0) {
                        // Swipe right - scroll left
                        scrollPosition = Math.max(0, scrollPosition - 100);
                    } else {
                        // Swipe left - scroll right
                        scrollPosition += 100;
                    }
                }
            }
        }
        
        // Initialize the carousel
        cloneItems();
        initCarousel();
        
        // Handle window resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                // Reset scroll position on resize
                scrollPosition = 0;
                techTrack.style.transform = 'translateX(0)';
            }, 100);
        });
    }
    
    // Add animation to tech items on scroll
    const techItems = document.querySelectorAll('.tech-item');
    
    function animateOnScroll() {
        techItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (itemTop < windowHeight - 100) {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Initial check
    animateOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Add click effect to tech items
    techItems.forEach(item => {
        item.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });
});
