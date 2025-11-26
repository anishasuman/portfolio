document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.projects-carousel');
    const slidesContainer = document.querySelector('.project-slides');
    const slides = document.querySelectorAll('.project-slide');
    const prevBtn = document.querySelector('.prev-project');
    const nextBtn = document.querySelector('.next-project');
    
    let currentIndex = 0;
    const slideWidth = slides[0].offsetWidth + 32; // Include gap
    const visibleSlides = 3; // Number of slides to show at once
    const totalSlides = slides.length;
    
    // Set initial position
    updateCarousel();
    
    // Next button click handler
    nextBtn.addEventListener('click', () => {
        if (currentIndex < totalSlides - visibleSlides) {
            currentIndex++;
            updateCarousel();
        } else {
            // Optional: Loop back to start
            // currentIndex = 0;
            // updateCarousel();
        }
    });
    
    // Previous button click handler
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        } else {
            // Optional: Loop to end
            // currentIndex = totalSlides - visibleSlides;
            // updateCarousel();
        }
    });
    
    // Update carousel position
    function updateCarousel() {
        const offset = -currentIndex * slideWidth;
        slidesContainer.style.transform = `translateX(${offset}px)`;
        
        // Update button states
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= totalSlides - visibleSlides;
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' && !nextBtn.disabled) {
            nextBtn.click();
        } else if (e.key === 'ArrowLeft' && !prevBtn.disabled) {
            prevBtn.click();
        }
    });
    
    // Touch support
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    }, { passive: true });
    
    carousel.addEventListener('touchmove', (e) => {
        touchEndX = e.touches[0].clientX;
    }, { passive: true });
    
    carousel.addEventListener('touchend', () => {
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50; // Minimum swipe distance
        const swipeDistance = touchStartX - touchEndX;
        
        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0 && !nextBtn.disabled) {
                // Swipe left - next
                nextBtn.click();
            } else if (swipeDistance < 0 && !prevBtn.disabled) {
                // Swipe right - previous
                prevBtn.click();
            }
        }
    }
    
    // Responsive adjustments
    function handleResize() {
        // Update slide width on window resize
        const newSlideWidth = slides[0].offsetWidth + 32; // Include gap
        if (newSlideWidth !== slideWidth) {
            updateCarousel();
        }
    }
    
    // Debounce resize events
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(handleResize, 250);
    });
    
    // Initial button state
    updateButtonStates();
    
    function updateButtonStates() {
        prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
        nextBtn.style.opacity = currentIndex >= totalSlides - visibleSlides ? '0.5' : '1';
        prevBtn.style.cursor = currentIndex === 0 ? 'not-allowed' : 'pointer';
        nextBtn.style.cursor = currentIndex >= totalSlides - visibleSlides ? 'not-allowed' : 'pointer';
    }
    
    // Add hover effects to project cards
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Add hover effect for desktop
        card.addEventListener('mouseenter', () => {
            if (window.innerWidth > 768) { // Only on desktop
                card.style.transform = 'translateY(-10px) scale(1.02)';
                card.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.15)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (window.innerWidth > 768) { // Only on desktop
                card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
            }
        });
        
        // Add click effect for mobile
        card.addEventListener('touchstart', () => {
            if (window.innerWidth <= 768) {
                card.style.transform = 'scale(0.98)';
            }
        }, { passive: true });
        
        card.addEventListener('touchend', () => {
            if (window.innerWidth <= 768) {
                card.style.transform = 'scale(1)';
            }
        }, { passive: true });
    });
});
