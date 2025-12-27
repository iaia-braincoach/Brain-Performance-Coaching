  
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
    try {
      const response = await fetch('assets/data/testimonials.json');
      if (!response.ok) throw new Error('Failed to load testimonials.json');
      const testimonials = await response.json();

      const wrapper = document.getElementById('testimonial-wrapper');
      wrapper.innerHTML = ''; // Clear wrapper before adding slides

      testimonials.forEach(item => {
        const slide = document.createElement('article');
        slide.classList.add('testimonial__card', 'swiper-slide');

        // Resolve image path relative to current HTML page
        const imgSrc = new URL(item.photo, window.location.href).href;

        slide.innerHTML = `
          <img src="${imgSrc}" alt="${item.author}" class="testimonial__img" onerror="this.onerror=null;this.src='assets/images/Logo.png';">
          <h3 class="testimonial__name">${item.author}</h3>
          <p class="testimonial__description">
            ${item.text}
          </p>
        `;

        wrapper.appendChild(slide);
      });

      initSwiper();
    } catch (error) {
      console.error('Error loading testimonials:', error);
    }
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

  // Load testimonials on page load
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

  /* ============================
   8. Cookie Banner (Improved)
   ============================ */
  (() => {
    const banner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-cookies');
    const rejectBtn = document.getElementById('reject-cookies');
    const manageBtn = document.getElementById('manage-cookies');
    const closeBtn = document.getElementById('close-banner'); // Assuming a close button

    // Check if consent already given
    const preferences = JSON.parse(localStorage.getItem('cookie-preferences'));
    if (preferences) {
      // If already consented, hide banner and apply settings
      banner.style.display = 'none';
      if (preferences.performance === 'allow' && window.gtag) {
        gtag('consent', 'update', {
          analytics_storage: 'granted'
        });
      }
      return;
    }

    // Show banner with animation
    banner.style.display = 'block';
    banner.style.opacity = '1';
    setTimeout(() => {
      banner.style.transition = 'opacity 0.5s ease';
      banner.style.opacity = '1';
    }, 100);

    // Accept all cookies
    acceptBtn.addEventListener('click', () => {
      const prefs = {
        performance: 'allow',
        personalised: 'allow',
        advertising: 'allow',
        profile: 'allow'
      };
      localStorage.setItem('cookie-preferences', JSON.stringify(prefs));
      hideBanner();
      // Enable analytics
      if (window.gtag) {
        gtag('consent', 'update', {
          analytics_storage: 'granted'
        });
      }
    });

    // Reject cookies (essential only)
    rejectBtn.addEventListener('click', () => {
      const prefs = {
        performance: 'deny',
        personalised: 'deny',
        advertising: 'deny',
        profile: 'deny'
      };
      localStorage.setItem('cookie-preferences', JSON.stringify(prefs));
      hideBanner();
      // Disable non-essential
      if (window.gtag) {
        gtag('consent', 'update', {
          analytics_storage: 'denied'
        });
      }
    });

    // Manage cookies - open modal
    manageBtn.addEventListener('click', () => {
      showCookieModal();
    });

    // Function to show cookie management modal
    function showCookieModal() {
      // Create modal if it doesn't exist
      let modal = document.getElementById('cookie-modal');
      if (!modal) {
        modal = document.createElement('div');
        modal.id = 'cookie-modal';
        modal.innerHTML = `
          <div class="modal-backdrop" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 1000; display: flex; align-items: center; justify-content: center;">
            <div class="modal-content" style="background: white; padding: 2rem; border-radius: 8px; max-width: 600px; width: 90%; max-height: 80vh; overflow-y: auto; position: relative;">
              <button class="modal-close" style="position: absolute; top: 10px; right: 10px; background: none; border: none; font-size: 1.5rem; cursor: pointer;">&times;</button>
              <h3 style="margin-top: 0;">Data improves your experience</h3>
              <p>In order to enhance your experience across our platforms and show you more relevant information, we use cookies and similar technologies, both owned and third party owned, as well as data sent directly from our servers. You can make changes at any time by visiting "Privacy" in Settings or by visiting "Privacy & Cookie Settings" at the bottom of our site.</p>
              <p>For more information, see our <a href="assets/pages/privacy-policy.html" target="_blank">Privacy Policy</a> and <a href="assets/pages/cookies-policy.html" target="_blank">Cookies Policy</a>.</p>
              
              <form id="cookie-form">
                <div style="margin: 1rem 0;">
                  <h4>Strictly necessary (always on)</h4>
                  <p>Enables core functionality to power your language, location and shopping bag. Also supports security, network management and accessibility.</p>
                  <input type="checkbox" id="necessary-cookies" checked disabled>
                </div>
                
                <div style="margin: 1rem 0;">
                  <h4>Performance & analytics</h4>
                  <p>Allows use of behavioural data to optimise performance, review how you interact with our sites and apps, and improve experiences.</p>
                  <label>
                    <input type="radio" name="performance" value="allow" id="performance-allow"> Allow data for improved experiences
                  </label><br>
                  <label>
                    <input type="radio" name="performance" value="deny" id="performance-deny"> Do not allow data for improved experiences
                  </label>
                </div>
                
                <div style="margin: 1rem 0;">
                  <h4>Personalised experiences</h4>
                  <p>Allows use of behavioural data, using cookies and other technologies, to improve your experience and provide relevant content on our platforms and in communications.</p>
                  <label>
                    <input type="radio" name="personalised" value="allow" id="personalised-allow"> Allow personalised experiences
                  </label><br>
                  <label>
                    <input type="radio" name="personalised" value="deny" id="personalised-deny"> Do not allow personalised experiences
                  </label>
                </div>
                
                <div style="margin: 1rem 0;">
                  <h4>Personalised advertising</h4>
                  <p>Allows sharing of behavioural data with advertising partners. This data is used to enhance and report on the personalised advertising experience on partner sites.</p>
                  <p><a href="assets/pages/cookies-policy.html#personalised-advertising" target="_blank">Learn more about personalised advertising</a></p>
                  <label>
                    <input type="radio" name="advertising" value="allow" id="advertising-allow"> Allow behavioural data sharing
                  </label><br>
                  <label>
                    <input type="radio" name="advertising" value="deny" id="advertising-deny"> Do not allow behavioural data sharing
                  </label>
                </div>
                
                <div style="margin: 1rem 0;">
                  <h4>Profile-based personalised advertising</h4>
                  <p>Allows sharing of your email address and phone number with advertising partners to personalise advertising based on your interests and measure the effectiveness of advertising on partner sites.</p>
                  <p><a href="assets/pages/cookies-policy.html#profile-based-advertising" target="_blank">Learn more about profile-based advertising</a></p>
                  <label>
                    <input type="radio" name="profile" value="allow" id="profile-allow"> Allow profile-based data sharing
                  </label><br>
                  <label>
                    <input type="radio" name="profile" value="deny" id="profile-deny"> Do not allow profile-based data sharing
                  </label>
                </div>
                
                <div style="margin-top: 2rem; text-align: center;">
                  <button type="button" id="confirm-choices" style="background: var(--color-6); color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; margin-right: 1rem;">Confirm Choices</button>
                  <button type="button" id="accept-all" style="background: var(--color-7); color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer;">Accept All</button>
                </div>
              </form>
            </div>
          </div>
        `;
        document.body.appendChild(modal);
      }

      modal.style.display = 'flex';

      // Load current preferences
      const preferences = JSON.parse(localStorage.getItem('cookie-preferences')) || {
        performance: 'allow',
        personalised: 'allow',
        advertising: 'allow',
        profile: 'allow'
      };
      document.getElementById('performance-' + preferences.performance).checked = true;
      document.getElementById('personalised-' + preferences.personalised).checked = true;
      document.getElementById('advertising-' + preferences.advertising).checked = true;
      document.getElementById('profile-' + preferences.profile).checked = true;

      // Event listeners
      const confirmBtn = document.getElementById('confirm-choices');
      const acceptAllBtn = document.getElementById('accept-all');
      const cancelBtn = document.getElementById('cancel-modal');
      const closeBtn = modal.querySelector('.modal-close');

      const closeModal = () => {
        modal.style.display = 'none';
      };

      const savePreferences = (prefs) => {
        localStorage.setItem('cookie-preferences', JSON.stringify(prefs));
        localStorage.setItem('cookie-consent', prefs.performance === 'allow' ? 'accepted' : 'rejected');
        if (window.gtag) {
          gtag('consent', 'update', {
            analytics_storage: prefs.performance === 'allow' ? 'granted' : 'denied'
          });
        }
        closeModal();
        banner.style.display = 'none';
      };

      confirmBtn.onclick = () => {
        const prefs = {
          performance: document.querySelector('input[name="performance"]:checked').value,
          personalised: document.querySelector('input[name="personalised"]:checked').value,
          advertising: document.querySelector('input[name="advertising"]:checked').value,
          profile: document.querySelector('input[name="profile"]:checked').value
        };
        savePreferences(prefs);
      };

      acceptAllBtn.onclick = () => {
        const prefs = {
          performance: 'allow',
          personalised: 'allow',
          advertising: 'allow',
          profile: 'allow'
        };
        // Set radios to allow
        ['performance-allow', 'personalised-allow', 'advertising-allow', 'profile-allow'].forEach(id => {
          document.getElementById(id).checked = true;
        });
        savePreferences(prefs);
      };

      cancelBtn.onclick = closeModal;
      closeBtn.onclick = closeModal;

      // Close on backdrop click
      modal.onclick = (e) => {
        if (e.target === modal) closeModal();
      };
    }

    // Close banner (optional, treat as reject)
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        localStorage.setItem('cookie-consent', 'rejected');
        hideBanner();
      });
    }

    function hideBanner() {
      banner.style.opacity = '0';
      setTimeout(() => {
        banner.style.display = 'none';
      }, 500);
    }
  })();

  /* ============================
   9. Using Cookie Preferences Elsewhere
   ============================ */
  (() => {
    // Function to get current cookie preferences
    function getCookiePreferences() {
      try {
        const prefs = JSON.parse(localStorage.getItem('cookie-preferences'));
        return prefs || {}; // Return empty object if none set
      } catch (error) {
        console.error('Error retrieving cookie preferences:', error);
        return {};
      }
    }

    // Example: Conditionally load Google Analytics based on performance preference
    const prefs = getCookiePreferences();
    if (prefs.performance === 'allow') {
      // Load Google Analytics script
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://www.googletagmanager.com/gtag/js?id=G-PM4JP6081Q'; // Replace with your GA ID
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
        gtag('config', 'G-PM4JP6081Q'); // Replace with your GA ID

      console.log('Google Analytics loaded (performance allowed).');
    } else {
      console.log('Google Analytics not loaded (performance denied).');
    }

    // Example: Show personalized content based on personalised preference
    if (prefs.personalised === 'allow') {
      // Show a dismissible pop-up instead of adding to the page
      showPersonalizedPopup();
      console.log('Personalized pop-up shown.');
    } else {
      console.log('Personalized content not shown (personalised denied).');
    }

    // Function to show personalized pop-up
    function showPersonalizedPopup() {
      // Create pop-up if it doesn't exist
      let popup = document.getElementById('personalized-popup');
      if (!popup) {
        popup = document.createElement('div');
        popup.id = 'personalized-popup';
        popup.innerHTML = `
          <div style="position: fixed; top: 20px; right: 20px; background: var(--color-5); border: 2px solid var(--color-6); border-radius: 8px; padding: 1rem; box-shadow: var(--shadow-soft); z-index: 10000; max-width: 300px; font-size: 0.9rem; color: var(--color-12);">
            <button id="close-popup" style="position: absolute; top: 5px; right: 5px; background: none; border: none; font-size: 1.2rem; cursor: pointer; color: var(--color-12);">&times;</button>
            <p style="margin: 0;">Welcome back! Based on your preferences, we've personalized your experience.</p>
          </div>
        `;
        document.body.appendChild(popup);

        // Add close functionality
        document.getElementById('close-popup').addEventListener('click', () => {
          popup.style.display = 'none';
        });

        // Auto-hide after 5 seconds
        setTimeout(() => {
          if (popup.style.display !== 'none') {
            popup.style.display = 'none';
          }
        }, 5000);
      }

      popup.style.display = 'block';
    }

    // Example: Load ad scripts based on advertising preference
    if (prefs.advertising === 'allow') {
      // Simulate loading an ad script (replace with real ad network)
      const adScript = document.createElement('script');
      adScript.src = 'https://example.com/ad-script.js'; // Replace with actual ad script URL
      document.head.appendChild(adScript);
      console.log('Ad scripts loaded (advertising allowed).');
    } else {
      console.log('Ad scripts not loaded (advertising denied).');
    }
  })();
});