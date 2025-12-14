  
console.log("main.js loaded ✔️");

document.addEventListener('DOMContentLoaded', function () {

  /* ============================
   1. EmailJS Form Handling
   ============================ */
  try {
    if (window.emailjs) {
      // Initialize EmailJS with your public key
      emailjs.init('3rDkD0r-2fQKz975J');
    }
  } catch (e) {
    console.warn('EmailJS not available:', e);
  }

  const contactForm = document.getElementById('contact-form');
  if (contactForm && window.emailjs) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault(); // prevent default form submission
      // Send form via EmailJS
      emailjs
        .sendForm('service_ug67avp', 'template_9y6qd2a', contactForm)
        .then(() => {
          alert('Message sent successfully!');
          contactForm.reset();
        })
        .catch((error) => {
          console.error('EMAILJS ERROR', error);
          alert('Failed to send message. Please try again later.');
        });
    });
  }

  /* ============================
   2. Smooth Scrolling & Mobile Menu
   ============================ */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const section = document.querySelector(this.getAttribute('href'));
      if (section) section.scrollIntoView({ behavior: 'smooth' });

      // Close sidemenu on mobile after clicking a link
      const sidemenu = document.getElementById('sidemenu');
      const toggleBtn = document.querySelector('.open-menu');
      if (sidemenu?.classList.contains('open')) {
        sidemenu.classList.remove('open');
        if (toggleBtn) {
          toggleBtn.classList.replace('ri-close-line', 'ri-menu-line');
          toggleBtn.setAttribute('aria-label', 'Open menu');
        }
      }
    });
  });

  // Menu toggle function (global for onclick handler)
  window.toggleMenu = function () {
    const sidemenu = document.getElementById('sidemenu');
    const toggleBtn = document.querySelector('.open-menu');
    if (!sidemenu) return;
    const isOpen = sidemenu.classList.toggle('open');
    if (toggleBtn) {
      toggleBtn.classList.toggle('ri-menu-line', !isOpen);
      toggleBtn.classList.toggle('ri-close-line', isOpen);
      toggleBtn.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    }
  };

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    const sidemenu = document.getElementById('sidemenu');
    const toggleBtn = document.querySelector('.open-menu');
    if (!sidemenu || !toggleBtn || !sidemenu.classList.contains('open')) return;
    if (!sidemenu.contains(e.target) && e.target !== toggleBtn) {
      sidemenu.classList.remove('open');
      toggleBtn.classList.replace('ri-close-line', 'ri-menu-line');
      toggleBtn.setAttribute('aria-label', 'Open menu');
    }
  });

  /* ============================
   3. Testimonials Section (FIXED)
   ============================ */
   async function loadTestimonials() {
    const response = await fetch('assets/data/testimonials.json');
    const testimonials = await response.json();

    const wrapper = document.getElementById('testimonial-wrapper');

    testimonials.forEach(item => {
      const slide = document.createElement('article');
      slide.classList.add('testimonial__card', 'swiper-slide');

      slide.innerHTML = `
        <img src="assets/img/avatar-default.png" alt="${item.author}" class="testimonial__img">

        <h3 class="testimonial__name">${item.author}</h3>
        <!--
        <div class="testimonial__rating">
          <div class="testimonial__stars">
            <i class="ri-star-fill"></i>
            <i class="ri-star-fill"></i>
            <i class="ri-star-fill"></i>
            <i class="ri-star-fill"></i>
            <i class="ri-star-fill"></i>
          </div>
          <h3 class="testimonial__number">5.0</h3>
        </div>
        -->
        <p class="testimonial__description">
          ${item.text}
        </p>
      `;

      wrapper.appendChild(slide);
    });

    initSwiper();
  }

  function initSwiper() {
    new Swiper('.testimonial__swiper', {
      loop: true,
      slidesPerView: 'auto',
      centeredSlides: true,
      spaceBetween: 16,
      grabCursor: true,
      speed: 600,

      effect: 'coverflow',
      coverflowEffect: {
        rotate: -90,
        depth: 600,
        modifier: 0.5,
        slideShadows: false,
      },

      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },

      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
    });
  }

  loadTestimonials();

  // Debug: peek at raw file content for quick troubleshooting
  fetch('./assets/data/testimonials.json')
    .then((res) => res.text())
    .then((text) => console.log('RAW RESPONSE (first 300 chars):', text.substring(0, 300)))
    .catch(() => console.log('RAW RESPONSE: not available'));

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
      workshop: {
        title: 'WORKSHOP',
        body: `
          <p>The 8-Dimension Assessment is a structured, evidence-informed questionnaire that evaluates mental performance across eight domains (e.g. attention, emotional regulation, motivation, routines). Results include a clear strengths/weaknesses summary, practical recommendations and a personalised action plan to address bottlenecks.</p>
          <p>Duration: ~30–45 minutes to complete. Delivery: online report + 30min review call.</p>
        `,
      },
      group: {
        title: 'GROUP TRAINING CYCLE',
        body: `
          <p>The Kickstart Programme combines assessment, goal-setting and short-term coaching to build immediate momentum. Includes a baseline assessment, 4 x 1:1 sessions and practical exercises for training and competition routines.</p>
          <p>Outcome: quick wins, clarity on priorities and a 6-week plan to embed new habits.</p>
        `,
      },
      elite: {
        title: 'ELITE PROGRAM',
        body: `
          <p>A 10–12 weeks transformative journey to elevate your mindset, mental skills, and autonomy. Ideal for athletes committed to sustainable peak performance and ready to unlock long-term mental mastery and flow.</p>
          <h4>Programme Features:</h4>
          <ul style="list-style: none; padding-left: 0;">
            <li>🏁 <strong>1-to-1 Sessions</strong> – 10 personalised sessions</li>
            <li>📝 <strong>Initial Assessment</strong> – baseline evaluation</li>
            <li>🎯 <strong>Personalised Goal Setting</strong></li>
            <li🧠> <strong>Mental Performance Tools</strong></li>
            <li>💪 <strong>Practical Exercises</strong> – weekly implementation</li>
            <li>📲 <strong>Daily WhatsApp Support</strong></li>
            <li>⚡ <strong>Full Personalisation of All Sessions</strong></li>
            <li>📊 <strong>Weekly Strategy Reviews & Custom Techniques</strong></li>
            <li>🌊 <strong>Flow State Training</strong></li>
          </ul>
        `,
      },
      partnership: {
        title: 'CUSTOM PARTNERSHIPS',
        body: `
          <p>Group Sessions focus on team dynamics, shared routines and collective performance psychology. Sessions are interactive, practical and tailored to the team's sporting context.</p>
          <p>Available as single workshops or multi-session packages for teams.</p>
        `,
      },
    };

    const modal = document.getElementById('service-modal');
    const titleEl = document.getElementById('service-modal-title');
    const bodyEl = document.getElementById('service-modal-body');
    const closeBtn = modal?.querySelector('.modal-close');

    const openService = (id) => {
      const data = services[id];
      if (!data || !modal) return;
      titleEl.textContent = data.title;
      bodyEl.innerHTML = data.body;
      modal.removeAttribute('hidden');
      modal.focus();
      document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
      if (!modal) return;
      modal.setAttribute('hidden', '');
      titleEl.textContent = '';
      bodyEl.innerHTML = '';
      document.body.style.overflow = '';
    };

    // Delegated click listener
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.service-open');
      if (btn) return openService(btn.dataset.service);
      const card = e.target.closest('.service-card');
      if (card && !e.target.closest('.service-open')) openService(card.dataset.service);
      if (e.target.dataset.close === 'true') closeModal();
    });

    closeBtn?.addEventListener('click', closeModal);

    // ESC key closes modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal?.hasAttribute('hidden')) closeModal();
    });

    // Focus trap
    document.addEventListener(
      'focus',
      (e) => {
        if (!modal || modal.hasAttribute('hidden')) return;
        if (!modal.contains(e.target)) {
          e.stopPropagation();
          modal.focus();
        }
      },
      true
    );
  })();

  /* ============================
   6. Scroll-triggered Animations
   ============================ */
  (() => {
    const animatedElements = document.querySelectorAll(
      '.fade-in, .fade-in-up, .fade-in-left, .fade-in-right'
    );
    if (!('IntersectionObserver' in window) || animatedElements.length === 0) {
      animatedElements.forEach((el) => {
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

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            el.style.opacity = 1;
            el.style.animationPlayState = 'running';
            obs.unobserve(el);
          }
        });
      },
      { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.15 }
    );

    animatedElements.forEach((el) => observer.observe(el));
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