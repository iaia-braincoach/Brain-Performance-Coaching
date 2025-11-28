console.log("main.js loaded ✔️");

document.addEventListener('DOMContentLoaded', function() {

  /* ============================
     1. EmailJS Form Handling
     ============================ */
  emailjs.init('3rDkD0r-2fQKz975J'); // Initialize EmailJS with your public key

  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault(); // prevent default form submission

      const formData = new FormData(contactForm);
      const formObj = Object.fromEntries(formData);
      console.log('Form submitted:', formObj); // debug log

      // Send form via EmailJS
      emailjs.sendForm('service_ug67avp', 'template_9y6qd2a', contactForm)
        .then(response => {
          console.log('EMAILJS SUCCESS', response);
          alert('Message sent successfully!');
          contactForm.reset();
        })
        .catch(error => {
          console.error('EMAILJS ERROR', error);
          alert('Failed to send message. Please try again later.');
        });
    });
  }

  /* ============================
     2. Smooth Scrolling & Mobile Menu
     ============================ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const section = document.querySelector(this.getAttribute('href'));
      if (section) section.scrollIntoView({ behavior: 'smooth' });

      // Close sidemenu on mobile after clicking a link
      const sidemenu = document.getElementById('sidemenu');
      const toggleBtn = document.querySelector('.open-menu');
      if (sidemenu?.classList.contains('open')) {
        sidemenu.classList.remove('open');
        if (toggleBtn) {
          toggleBtn.classList.replace('fa-times', 'fa-bars');
          toggleBtn.setAttribute('aria-label', 'Open menu');
        }
      }
    });
  });

  // Menu toggle function
  window.toggleMenu = function() {
    const sidemenu = document.getElementById('sidemenu');
    const toggleBtn = document.querySelector('.open-menu');
    if (!sidemenu) return;

    const isOpen = sidemenu.classList.toggle('open');
    if (toggleBtn) {
      toggleBtn.classList.toggle('fa-bars', !isOpen);
      toggleBtn.classList.toggle('fa-times', isOpen);
      toggleBtn.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    }
  };

  // Close mobile menu when clicking outside
  document.addEventListener('click', e => {
    const sidemenu = document.getElementById('sidemenu');
    const toggleBtn = document.querySelector('.open-menu');
    if (!sidemenu || !toggleBtn || !sidemenu.classList.contains('open')) return;
    if (!sidemenu.contains(e.target) && e.target !== toggleBtn) {
      sidemenu.classList.remove('open');
      toggleBtn.classList.replace('fa-times', 'fa-bars');
      toggleBtn.setAttribute('aria-label', 'Open menu');
    }
  });

  /* ============================
     3. Testimonials Section
     ============================ */
  const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  fetch('./assets/data/testimonials.json')
    .then(res => res.json())
    .then(testimonialsData => {
      const shuffledTestimonials = shuffleArray(testimonialsData);
      const track = document.querySelector('.testimonials-track');
      if (!track) return;

      track.innerHTML = ""; // clear existing

      shuffledTestimonials.forEach(item => {
        const card = document.createElement('div');
        card.className = 'testimonial-card';
        card.innerHTML = `
          <p>${item.text}</p>
          </br>
          <cite><strong>${item.author}</strong></cite>
        `;
        track.appendChild(card);
      });

      // Clone cards if needed for continuous animation
      const cards = track.querySelectorAll('.testimonial-card');
      const trackWidth = track.offsetWidth;
      if (trackWidth < window.innerWidth * 3) {
        cards.forEach(card => track.appendChild(card.cloneNode(true)));
      }

      // Reset animation after it ends
      track.addEventListener('animationend', () => {
        track.style.animation = 'none';
        track.offsetHeight; // force reflow
        track.style.animation = null;
      });
    })
    .catch(err => console.error("Error loading testimonials:", err));

  // Debug fetch for raw response
  fetch('./assets/data/testimonials.json')
    .then(res => res.text())
    .then(text => console.log("RAW RESPONSE:", text.substring(0, 300)));

  /* ============================
     4. Preferred Datetime Minimum
     ============================ */
  const dt = document.getElementById('preferred-datetime');
  if (dt) {
    const now = new Date();
    const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 16); // YYYY-MM-DDTHH:MM
    dt.min = local;
  }

  /* ============================
     5. Service Modal
     ============================ */
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
    const closeBtn = modal?.querySelector('.modal-close');

    const openService = id => {
      const data = services[id];
      if (!data) return;
      titleEl.textContent = data.title;
      bodyEl.innerHTML = data.body;
      modal.removeAttribute('hidden');
      modal.focus();
      document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
      modal.setAttribute('hidden', '');
      titleEl.textContent = '';
      bodyEl.innerHTML = '';
      document.body.style.overflow = '';
    };

    // Delegated click listener
    document.addEventListener('click', e => {
      const btn = e.target.closest('.service-open');
      if (btn) return openService(btn.dataset.service);

      const card = e.target.closest('.service-card');
      if (card && !e.target.closest('.service-open')) openService(card.dataset.service);

      if (e.target.dataset.close === 'true') closeModal();
    });

    closeBtn?.addEventListener('click', closeModal);

    // ESC key closes modal
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && !modal.hasAttribute('hidden')) closeModal();
    });

    // Focus trap
    document.addEventListener('focus', e => {
      if (!modal || modal.hasAttribute('hidden')) return;
      if (!modal.contains(e.target)) {
        e.stopPropagation();
        modal.focus();
      }
    }, true);
  })();

  /* ============================
     6. Scroll-triggered Animations
     ============================ */
  (() => {
    const animatedElements = document.querySelectorAll(
      '.fade-in, .fade-in-up, .fade-in-left, .fade-in-right'
    );
    if (!('IntersectionObserver' in window) || animatedElements.length === 0) {
      animatedElements.forEach(el => {
        el.style.opacity = 1;
        el.style.animationPlayState = 'running';
      });
      return;
    }

    animatedElements.forEach((el, idx) => {
      if (!el.style.animationDelay) el.style.animationDelay = `${(idx % 6) * 0.06}s`;
      el.style.opacity = 0;
      el.style.animationPlayState = 'paused';
    });

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          el.style.opacity = 1;
          el.style.animationPlayState = 'running';
          obs.unobserve(el);
        }
      });
    }, { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.15 });

    animatedElements.forEach(el => observer.observe(el));
  })();

  /* ============================
     7. Sticky Header & Padding
     ============================ */
  (() => {
    const header = document.querySelector('.header-sticky');
    if (!header) return;

    function applyHeaderPadding() {
      const h = Math.ceil(header.getBoundingClientRect().height);
      document.documentElement.style.setProperty('--header-height', `${h}px`);
      document.body.style.paddingTop = `${h}px`;
      const navLinks = document.querySelector('.nav-links');
      if (navLinks) navLinks.style.top = `${h}px`;
    }

    window.addEventListener('load', applyHeaderPadding);
    window.addEventListener('resize', applyHeaderPadding);
    if (document.fonts?.ready) {
      document.fonts.ready.then(applyHeaderPadding).catch(() => {});
    } else {
      setTimeout(applyHeaderPadding, 250);
    }

    window.applyHeaderPadding = applyHeaderPadding;
  })();

});

