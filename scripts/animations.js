// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Typing effect for hero headline
    const heroHeadline = document.querySelector('#hero h1');

    if (heroHeadline) {
        // Store the original text
        const originalText = heroHeadline.textContent;

        // Clear the text
        heroHeadline.textContent = '';

        // Add typing animation class
        heroHeadline.classList.add('typing-animation');

        // Type out the text character by character
        let charIndex = 0;
        const typeWriter = function() {
            if (charIndex < originalText.length) {
                heroHeadline.textContent += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 100);
            }
        };

        // Start typing after a short delay
        setTimeout(typeWriter, 500);
    }

    // Horizontal scrolling project gallery
    const projectGallery = document.querySelector('.project-gallery');

    if (projectGallery && window.innerWidth > 768) {
        // Enable horizontal scrolling with mouse wheel
        projectGallery.addEventListener('wheel', function(e) {
            if (e.deltaY !== 0) {
                e.preventDefault();
                this.scrollLeft += e.deltaY;
            }
        });
    }

    // Animate numbers in statistics
    const animateNumbers = function() {
        const statNumbers = document.querySelectorAll('.stat-number');

        statNumbers.forEach(number => {
            const target = parseInt(number.dataset.target);
            const duration = 2000; // 2 seconds
            const step = target / (duration / 16); // 60fps

            let current = 0;
            const updateNumber = function() {
                current += step;
                if (current < target) {
                    number.textContent = Math.floor(current);
                    requestAnimationFrame(updateNumber);
                } else {
                    number.textContent = target;
                }
            };

            updateNumber();
        });
    };

    // Run animations when elements come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('stats-container')) {
                    animateNumbers();
                }

                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    // Observe elements with animation classes
    document.querySelectorAll('.animate-on-scroll, .stats-container').forEach(element => {
        observer.observe(element);
    });
});
