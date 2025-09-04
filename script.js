//ONAM
// Show popup on page load
window.addEventListener("load", () => {
  const popup = document.getElementById("popup");
  const closeBtn = document.querySelector(".popup-close");

  popup.style.display = "flex";

  closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
  });

  // Close when clicking outside content
  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      popup.style.display = "none";
    }
  });
});
// Flower Falling Effect
function createFlower() {
  const flower = document.createElement("div");
  flower.classList.add("flower");

  // Random start position
  flower.style.left = Math.random() * 100 + "vw";

  // Random animation duration
  const duration = Math.random() * 5 + 5; // between 5s - 10s
  flower.style.animationDuration = duration + "s";

  // Random size
  const size = Math.random() * 20 + 20; // 20px - 40px
  flower.style.width = size + "px";
  flower.style.height = size + "px";

  document.getElementById("falling-flowers-container").appendChild(flower);

  // Remove after animation
  setTimeout(() => {
    flower.remove();
  }, duration * 1000);
}

// Keep generating flowers
setInterval(createFlower, 400);
//onam close





document.addEventListener('DOMContentLoaded', function() {
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });

            // Close mobile nav if open
            if (window.innerWidth <= 768) {
                const navLinks = document.querySelector('.nav-links');
                const hamburger = document.querySelector('.hamburger');
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });

    // Sticky Navigation Bar
    const navbar = document.getElementById('navbar');
    let prevScrollPos = window.pageYOffset;

    window.onscroll = function() {
        const currentScrollPos = window.pageYOffset;
        if (prevScrollPos > currentScrollPos) {
            // Scrolling up
            navbar.style.top = "0";
        } else {
            // Scrolling down
            if (currentScrollPos > 100) { // Adjust this value as needed
                navbar.style.top = "-90px"; // Hide navbar
            }
        }
        prevScrollPos = currentScrollPos;

        // Add shadow/background change on scroll
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    // Style for 'scrolled' class (add to style.css)
    /*
    #navbar.scrolled {
        background-color: rgba(255, 255, 255, 0.98);
        box-shadow: 0 4px 10px rgba(0,0,0,0.15);
    }
    body.dark-theme #navbar.scrolled {
        background-color: rgba(34, 34, 34, 0.98);
        box-shadow: 0 4px 10px rgba(0,0,0,0.15);
    }
    */


    // Hero Section - Auto Sliding Background Images
    const slides = document.querySelectorAll('.hero-section .slide');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            // Optional: Preload next image (for better performance, not fully implemented here for simplicity)
            // if (i === (index + 1) % slides.length) {
            //     const img = new Image();
            //     img.src = slide.style.backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/i, "$1");
            // }
        });
        slides[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Preload all hero images for smoother transition
    slides.forEach(slide => {
        const imageUrl = slide.style.backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/i, "$1");
        if (imageUrl) {
            const img = new Image();
            img.src = imageUrl;
            img.onload = () => console.log(`Image loaded: ${imageUrl}`);
            img.onerror = () => console.error(`Failed to load image: ${imageUrl}`);
        }
    });

    setInterval(nextSlide, 5000); // Change slide every 5 seconds
    showSlide(currentSlide); // Initialize first slide


    // Mobile Menu Toggle (Hamburger)
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active'); // Optional: for animating hamburger icon
    });

    // Optional: Close mobile menu when clicking outside
    document.addEventListener('click', (event) => {
        if (!navLinks.contains(event.target) && !hamburger.contains(event.target) && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });


    // Lightbox Functionality (Optional)
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-btn');

    galleryItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            lightbox.style.display = 'block';
            lightboxImg.src = this.href;
        });
    });

    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });

    // Image Lazy Loading (Optional - basic implementation using Intersection Observer)
    const lazyLoadImages = document.querySelectorAll('img'); // Select all images

    if ('IntersectionObserver' in window) {
        let observerOptions = {
            rootMargin: '0px',
            threshold: 0.1
        };

        let imgObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src'); // Use data-src for lazy loaded images
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src'); // Remove data-src once loaded
                        observer.unobserve(img); // Stop observing once loaded
                    }
                }
            });
        }, observerOptions);

        lazyLoadImages.forEach(img => {
            if (img.getAttribute('data-src')) { // Only observe images with data-src
                imgObserver.observe(img);
            }
        });
    } else {
        // Fallback for browsers that don't support Intersection Observer
        lazyLoadImages.forEach(img => {
            const src = img.getAttribute('data-src');
            if (src) {
                img.src = src;
                img.removeAttribute('data-src');
            }
        });
    }

    // For lazy loading, modify your HTML image tags like this:
    // <img src="placeholder.jpg" data-src="actual-image.jpg" alt="Description">
    // Hero slider images are preloaded differently as they are critical for initial view.
    // Gallery and attraction images would benefit most from lazy loading.


    // Dark/Light Theme Toggle (Optional)
    const themeToggleBtn = document.createElement('div');
    themeToggleBtn.classList.add('theme-toggle');
    themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>'; // Default to moon icon
    document.body.appendChild(themeToggleBtn);

    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.body.classList.add(currentTheme);
        themeToggleBtn.innerHTML = currentTheme === 'dark-theme' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }

    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        let theme = 'light-theme';
        if (document.body.classList.contains('dark-theme')) {
            theme = 'dark-theme';
            themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
        }
        localStorage.setItem('theme', theme);
    });

});

document.addEventListener('DOMContentLoaded', () => {
    // Other existing JavaScript code should be here

    // Video Autoplay when in view
    const video = document.getElementById('kayakingVideo');
    if (video) {
        const observerOptions = {
            root: null, // Use the viewport as the root
            rootMargin: '0px',
            threshold: 0.5 // Trigger when 50% of the video is visible
        };

        const videoObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // If video is in view, play it
                    video.play().catch(error => {
                        console.error("Video autoplay prevented:", error);
                        // Handle potential autoplay policy issues (e.g., show a play button)
                    });
                } else {
                    // If video is out of view, pause it
                    video.pause();
                }
            });
        }, observerOptions);

        videoObserver.observe(video); // Start observing the video element
    }
});
