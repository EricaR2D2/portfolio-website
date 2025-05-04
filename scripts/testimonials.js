document.addEventListener('DOMContentLoaded', function() {
    // Testimonial slider functionality
    const setupTestimonialSlider = function() {
        const slider = document.querySelector('.testimonial-slider');
        const slides = document.querySelectorAll('.testimonial-slide');
        const dotsContainer = document.querySelector('.testimonial-dots');
        const prevButton = document.querySelector('.prev-testimonial');
        const nextButton = document.querySelector('.next-testimonial');
        
        if (!slider || slides.length === 0) return;
        
        let currentSlide = 0;
        
        // Create dots
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
            
            dotsContainer.appendChild(dot);
        });
        
        // Hide all slides except the first one
        slides.forEach((slide, index) => {
            if (index !== 0) {
                slide.style.display = 'none';
            }
        });
        
        // Go to specific slide
        const goToSlide = function(index) {
            // Hide current slide
            slides[currentSlide].style.display = 'none';
            
            // Update current slide index
            currentSlide = index;
            
            // If we're past the last slide, go to first slide
            if (currentSlide >= slides.length) {
                currentSlide = 0;
            }
            
            // If we're before the first slide, go to last slide
            if (currentSlide < 0) {
                currentSlide = slides.length - 1;
            }
            
            // Show new current slide
            slides[currentSlide].style.display = 'block';
            
            // Update dots
            const dots = document.querySelectorAll('.dot');
            dots.forEach((dot, i) => {
                if (i === currentSlide) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        };
        
        // Next slide
        const nextSlide = function() {
            goToSlide(currentSlide + 1);
        };
        
        // Previous slide
        const prevSlide = function() {
            goToSlide(currentSlide - 1);
        };
        
        // Add event listeners to buttons
        if (prevButton) prevButton.addEventListener('click', prevSlide);
        if (nextButton) nextButton.addEventListener('click', nextSlide);
        
        // Auto-advance slides every 5 seconds
        setInterval(nextSlide, 5000);
    };
    
    setupTestimonialSlider();
});