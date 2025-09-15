// Modern Scripts for Midas Technical Solutions

document.addEventListener('DOMContentLoaded', function() {
    // Video Player Functionality
    const videoPlaceholder = document.querySelector('.video-placeholder');
    const videoEmbed = document.querySelector('.video-embed');

    if (videoPlaceholder && videoEmbed) {
        videoPlaceholder.addEventListener('click', function() {
            videoPlaceholder.style.display = 'none';
            videoEmbed.style.display = 'block';
        });
    }

    // Product Gallery Functionality
    const mainImage = document.getElementById('main-gallery-image');
    const thumbnails = document.querySelectorAll('.thumbnail');

    function changeImage(src, thumbnail) {
        if (mainImage) {
            mainImage.src = src;
        }

        // Update active thumbnail
        thumbnails.forEach(thumb => thumb.classList.remove('active'));
        thumbnail.classList.add('active');
    }

    // Make changeImage function globally available
    window.changeImage = changeImage;

    // Lightbox Functionality
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <button class="lightbox-close" onclick="closeLightbox()">&times;</button>
            <img src="" alt="Product Image">
        </div>
    `;
    document.body.appendChild(lightbox);

    function openLightbox() {
        const mainImg = document.getElementById('main-gallery-image');
        if (mainImg) {
            lightbox.querySelector('img').src = mainImg.src;
            lightbox.classList.add('active');
        }
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
    }

    // Make functions globally available
    window.openLightbox = openLightbox;
    window.closeLightbox = closeLightbox;

    // Close lightbox when clicking outside
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation for lightbox
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    // Loading Animation
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                loadingOverlay.classList.add('hidden');
            }, 1000);
        });
    }

    // Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.getElementById('sidebar-menu');
    const sidebarClose = document.getElementById('sidebar-close');

    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.add('open');
        });
    }

    if (sidebarClose && sidebar) {
        sidebarClose.addEventListener('click', function() {
            sidebar.classList.remove('open');
        });
    }

    // Close sidebar when clicking outside
    if (sidebar) {
        sidebar.addEventListener('click', function(e) {
            if (e.target === sidebar) {
                sidebar.classList.remove('open');
            }
        });
    }

    // Smooth Scrolling for Anchor Links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed header

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Product Carousel (if exists)
    const carouselTrack = document.getElementById('carousel-track');
    const carouselPrev = document.getElementById('carousel-prev');
    const carouselNext = document.getElementById('carousel-next');
    const carouselIndicators = document.getElementById('carousel-indicators');

    if (carouselTrack && carouselPrev && carouselNext) {
        let currentIndex = 0;
        const slides = carouselTrack.children;
        const totalSlides = slides.length;

        function updateCarousel() {
            const translateX = -currentIndex * 100;
            carouselTrack.style.transform = `translateX(${translateX}%)`;

            // Update indicators
            if (carouselIndicators) {
                const indicators = carouselIndicators.children;
                for (let i = 0; i < indicators.length; i++) {
                    indicators[i].classList.toggle('active', i === currentIndex);
                }
            }
        }

        carouselPrev.addEventListener('click', function() {
            currentIndex = currentIndex > 0 ? currentIndex - 1 : totalSlides - 1;
            updateCarousel();
        });

        carouselNext.addEventListener('click', function() {
            currentIndex = currentIndex < totalSlides - 1 ? currentIndex + 1 : 0;
            updateCarousel();
        });

        // Auto-play carousel
        setInterval(function() {
            currentIndex = currentIndex < totalSlides - 1 ? currentIndex + 1 : 0;
            updateCarousel();
        }, 5000);
    }

    // Newsletter Form Handling
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;

            if (email) {
                // Here you would typically send the email to your backend
                alert('Thank you for subscribing! We\'ll keep you updated with the latest news.');
                this.reset();
            }
        });
    }

    // Search Functionality Enhancement
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    if (searchForm && searchInput && searchResults) {
        let searchTimeout;

        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            const query = this.value.trim();

            if (query.length > 2) {
                searchTimeout = setTimeout(function() {
                    // Here you would typically make an API call to search products
                    searchResults.innerHTML = `
                        <div class="search-result-item">
                            <a href="#">iPhone 13 Screen - $${Math.floor(Math.random() * 100) + 50}</a>
                        </div>
                        <div class="search-result-item">
                            <a href="#">Samsung Battery - $${Math.floor(Math.random() * 50) + 20}</a>
                        </div>
                        <div class="search-result-item">
                            <a href="#">Repair Tools Kit - $${Math.floor(Math.random() * 200) + 100}</a>
                        </div>
                    `;
                    searchResults.style.display = 'block';
                }, 300);
            } else {
                searchResults.style.display = 'none';
            }
        });

        // Hide search results when clicking outside
        document.addEventListener('click', function(e) {
            if (!searchForm.contains(e.target)) {
                searchResults.style.display = 'none';
            }
        });
    }

    // Add loading states to buttons
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            this.disabled = true;

            // Reset after 2 seconds (for demo purposes)
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
            }, 2000);
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.category-card, .service-card, .stat-item');
    animateElements.forEach(element => {
        observer.observe(element);
    });

    // Add CSS for animation
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: fadeInUp 0.6s ease-out forwards;
        }

        @keyframes fadeInUp {
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
});
