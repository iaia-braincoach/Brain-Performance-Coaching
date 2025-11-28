document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS (replace with your public key)
    emailjs.init('3rDkD0r-2fQKz975J');

    // Remove duplicate handlers: use a single submit handler that sends via EmailJS
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Optional: keep console logging for debug
            const formData = new FormData(contactForm);
            const formObj = Object.fromEntries(formData);
            console.log('Form submitted:', formObj);

            // Send the form to EmailJS (replace SERVICE_ID and TEMPLATE_ID)
            emailjs.sendForm('service_ug67avp', 'template_9y6qd2a', contactForm)
                .then(function(response) {
                    console.log('EMAILJS SUCCESS', response);
                    alert('Message sent successfully!');
                    contactForm.reset();
                }, function(error) {
                    console.error('EMAILJS ERROR', error);
                    alert('Failed to send message. Please try again later.');
                });
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

    /* Service modal: content and behaviour */
    (() => {
      const services = {
        "workshop": {
          title: "WORKSHOP",
          body: `
            <p>The 8-Dimension Assessment is a structured, evidence-informed questionnaire that evaluates mental performance across eight domains (e.g. attention, emotional regulation, motivation, routines). Results include a clear strengths/weaknesses summary, practical recommendations and a personalised action plan to address bottlenecks.</p>
            <p>Duration: ~30–45 minutes to complete. Delivery: online report + 30min review call.</p>
          `
        },
        "group": {
          title: "GROUP TRAINING CYCLE",
          body: `
            <p>The Kickstart Programme combines assessment, goal-setting and short-term coaching to build immediate momentum. Includes a baseline assessment, 4 x 1:1 sessions and practical exercises for training and competition routines.</p>
            <p>Outcome: quick wins, clarity on priorities and a 6-week plan to embed new habits.</p>
          `
        },
        "elite": {
          title: "ELITE PROGRAM",
          body: `
            <p>A 10–12 weeks transformative journey to elevate your mindset, mental skills, and autonomy. Ideal for athletes committed to sustainable peak performance and ready to unlock long-term mental mastery and flow.</p>
            <h4>Programme Features:</h4>
            <ul style="list-style: none; padding-left: 0;">
              <li>🏁 <strong>1-to-1 Sessions</strong> – 10 personalised sessions</li>
              <li>📝 <strong>Initial Assessment</strong> – baseline evaluation</li>
              <li>🎯 <strong>Personalised Goal Setting</strong></li>
              <li>🧠 <strong>Mental Performance Tools</strong></li>
              <li>💪 <strong>Practical Exercises</strong> – weekly implementation</li>
              <li>📲 <strong>Daily WhatsApp Support</strong></li>
              <li>⚡ <strong>Full Personalisation of All Sessions</strong></li>
              <li>📊 <strong>Weekly Strategy Reviews & Custom Techniques</strong></li>
              <li>🌊 <strong>Flow State Training</strong></li>
            </ul>
          `
        },

        "partnership": {
          title: "CUSTOM PARTNERSHIPS",
          body: `
            <p>Group Sessions focus on team dynamics, shared routines and collective performance psychology. Sessions are interactive, practical and tailored to the team's sporting context.</p>
            <p>Available as single workshops or multi-session packages for teams.</p>
          `
        }
      };

      const modal = document.getElementById('service-modal');
      const titleEl = document.getElementById('service-modal-title');
      const bodyEl = document.getElementById('service-modal-body');
      const closeBtn = modal && modal.querySelector('.modal-close');

      function openService(id) {
        const data = services[id];
        if (!data) return;
        titleEl.textContent = data.title;
        bodyEl.innerHTML = data.body;
        modal.removeAttribute('hidden');
        modal.focus();
        document.body.style.overflow = 'hidden';
      }

      function closeModal() {
        modal.setAttribute('hidden', '');
        titleEl.textContent = '';
        bodyEl.innerHTML = '';
        document.body.style.overflow = '';
      }

      // Delegated click listener for buttons
      document.addEventListener('click', (e) => {
        const btn = e.target.closest('.service-open');
        if (btn) {
          const id = btn.dataset.service;
          openService(id);
          return;
        }
        // open modal if clicking card itself (optional)
        const card = e.target.closest('.service-card');
        if (card && !e.target.closest('.service-open')) {
          const id = card.dataset.service;
          if (id) openService(id);
        }
        // click on backdrop to close
        if (e.target && e.target.dataset && e.target.dataset.close === 'true') {
          closeModal();
        }
      });

      // close button
      closeBtn && closeBtn.addEventListener('click', closeModal);

      // ESC key closes modal
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.hasAttribute('hidden')) closeModal();
      });

      // trap focus inside modal (basic)
      document.addEventListener('focus', function (e) {
        if (!modal || modal.hasAttribute('hidden')) return;
        if (!modal.contains(e.target)) {
          e.stopPropagation();
          modal.focus();
        }
      }, true);
    })();

    /* ========== Scroll-triggered animations ========== */
    (function() {
        // Select elements that should animate when scrolled into view
        const animatedElements = document.querySelectorAll(
            '.fade-in, .fade-in-up, .fade-in-left, .fade-in-right'
        );

        if (!('IntersectionObserver' in window) || animatedElements.length === 0) {
            // fallback: just set opacity to 1 so they are visible
            animatedElements.forEach(el => {
                el.style.opacity = 1;
                el.style.animationPlayState = 'running';
            });
            return;
        }

        // Setup a small stagger based on groups: elements inside the same parent will be staggered slightly
        animatedElements.forEach((el, idx) => {
            // if element already has inline animationDelay, keep it; otherwise set a small default
            if (!el.style.animationDelay) {
                // compute delay per element but keep small so layout feels snappy
                const delay = (idx % 6) * 0.06; // cycles 0..0.3s for visual variety
                el.style.animationDelay = `${delay}s`;
            }
            // start paused & invisible; IntersectionObserver will start the animation
            el.style.opacity = 0;
            el.style.animationPlayState = 'paused';
        });

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    el.style.opacity = 1;
                    el.style.animationPlayState = 'running';
                    // optional: unobserve once played to save performance
                    obs.unobserve(el);
                }
            });
        }, {
            root: null,
            rootMargin: '0px 0px -10% 0px', // trigger slightly before bottom
            threshold: 0.15
        });

        animatedElements.forEach(el => observer.observe(el));
    })();

    // End of DOMContentLoaded
});
