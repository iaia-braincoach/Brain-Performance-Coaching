document.addEventListener('DOMContentLoaded', function() {
    // Handle contact form submission
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formObj = Object.fromEntries(formData);
            
            // For now, just log the form data
            console.log('Form submitted:', formObj);
            
            // Here you would typically send the data to a server
            alert('Thanks for your message! I\'ll get back to you soon.');
            
            // Reset the form
            contactForm.reset();
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const section = document.querySelector(this.getAttribute('href'));
            if (section) {
                section.scrollIntoView({
                    behavior: 'smooth'
                });
            }

            // Close sidemenu on mobile after clicking a link
            const sidemenu = document.getElementById('sidemenu');
            const toggleBtn = document.querySelector('.open-menu');
            if (sidemenu && sidemenu.classList.contains('open')) {
                sidemenu.classList.remove('open');
                if (toggleBtn) {
                    toggleBtn.classList.remove('fa-times');
                    toggleBtn.classList.add('fa-bars');
                    toggleBtn.setAttribute('aria-label', 'Open menu');
                }
            }
        });
    });

    // Handle testimonials scrolling
    const track = document.querySelector('.testimonials-track');
    if (track) {
        // Clone testimonials for seamless loop if needed
        const cards = track.querySelectorAll('.testimonial-card');
        const trackWidth = track.offsetWidth;
        
        // Check if we need more clones for longer tracks
        if (trackWidth < window.innerWidth * 3) {
            cards.forEach(card => {
                const clone = card.cloneNode(true);
                track.appendChild(clone);
            });
        }
        
        // Reset animation when track reaches end
        track.addEventListener('animationend', () => {
            track.style.animation = 'none';
            track.offsetHeight; // Trigger reflow
            track.style.animation = null;
        });
    }

    const dt = document.getElementById('preferred-datetime');
    if (dt) {
      const now = new Date();
      const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 16); // format "YYYY-MM-DDTHH:MM"
      dt.min = local;
    }

    // Single toggle function for the menu (uses the same bars button for open/close)
    window.toggleMenu = function() {
        const sidemenu = document.getElementById('sidemenu');
        const toggleBtn = document.querySelector('.open-menu');
        if (!sidemenu) return;

        const isOpen = sidemenu.classList.toggle('open');
        if (toggleBtn) {
            // switch icon between bars <-> times
            if (isOpen) {
                toggleBtn.classList.remove('fa-bars');
                toggleBtn.classList.add('fa-times');
                toggleBtn.setAttribute('aria-label', 'Close menu');
            } else {
                toggleBtn.classList.remove('fa-times');
                toggleBtn.classList.add('fa-bars');
                toggleBtn.setAttribute('aria-label', 'Open menu');
            }
        }
    };

    // Optional: close menu when clicking outside (mobile)
    document.addEventListener('click', (ev) => {
        const sidemenu = document.getElementById('sidemenu');
        const toggleBtn = document.querySelector('.open-menu');
        if (!sidemenu || !toggleBtn) return;
        if (!sidemenu.classList.contains('open')) return;
        const target = ev.target;
        if (target === sidemenu || sidemenu.contains(target) || target === toggleBtn) return;
        // clicked outside
        sidemenu.classList.remove('open');
        toggleBtn.classList.remove('fa-times');
        toggleBtn.classList.add('fa-bars');
        toggleBtn.setAttribute('aria-label', 'Open menu');
    });
});