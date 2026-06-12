/* ============================================
   Apple-inspired Resume Site — JavaScript
   ============================================ */

(function () {
  'use strict';

  /* ---- 1. Navigation scroll effect ---- */
  const nav = document.getElementById('nav');
  const progressBar = document.getElementById('scrollProgress');
  const backToTop = document.getElementById('backToTop');

  function handleScroll() {
    const scrollY = window.scrollY;

    // Nav background
    nav.classList.toggle('scrolled', scrollY > 40);

    // Progress bar
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
    progressBar.style.width = progress + '%';

    // Back to top
    backToTop.classList.toggle('visible', scrollY > window.innerHeight * 0.5);
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* ---- 2. Back to top click ---- */
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---- 3. Mobile nav toggle ---- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });

  /* ---- 4. Hero subtitle typing animation ---- */
  const subtitleEl = document.getElementById('heroSubtitle');
  if (subtitleEl) {
    const fullText = '电商运营 \u00B7 抖音内容 \u00B7 商务交付 \u00B7 动手实践';
    let charIndex = 0;

    function typeChar() {
      if (charIndex < fullText.length) {
        subtitleEl.textContent += fullText[charIndex];
        charIndex++;
        // Variable speed for natural feel
        const delay = fullText[charIndex - 1] === '\u00B7' ? 300 : 55 + Math.random() * 40;
        setTimeout(typeChar, delay);
      } else {
        subtitleEl.classList.add('typing-done');
        // Keep cursor blinking for a bit then remove
        setTimeout(() => {
          subtitleEl.classList.remove('typing-done');
        }, 4000);
      }
    }

    // Start typing after hero fade-in (approx 0.5s delay)
    setTimeout(typeChar, 700);
  }

  /* ---- 5. Intersection Observer for reveal animations ---- */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -80px 0px'
    }
  );

  revealElements.forEach(el => revealObserver.observe(el));

  /* ---- 6. Active nav link highlighting ---- */
  const sections = document.querySelectorAll('.section[id]');
  const navAnchors = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    let current = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
        current = section.getAttribute('id');
      }
    });

    navAnchors.forEach(anchor => {
      anchor.classList.toggle('active', anchor.getAttribute('href') === '#' + current);
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  /* ---- 7. Counter animation for stats ---- */
  const statNumbers = document.querySelectorAll('.stat-number');

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-target'));
          if (isNaN(target)) return;

          let current = 0;
          const duration = 1200;
          const startTime = performance.now();

          function countUp(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            current = Math.floor(eased * target);
            el.textContent = current;

            if (progress < 1) {
              requestAnimationFrame(countUp);
            } else {
              el.textContent = target;
            }
          }

          requestAnimationFrame(countUp);
          counterObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNumbers.forEach(el => counterObserver.observe(el));

  /* ---- 9. (removed - hero overlay was causing dim issue) ---- */

  /* ---- 10. Marquee tag duplication for seamless loop ---- */
  const marqueeContent = document.querySelector('.marquee-content');
  if (marqueeContent) {
    // Clone all children for seamless scroll
    const items = Array.from(marqueeContent.children);
    for (const item of items) {
      marqueeContent.appendChild(item.cloneNode(true));
    }
  }

  /* ---- 11. 3D Tilt effect on project cards ---- */
  const projectCards = document.querySelectorAll('.project-card');

  projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / centerY * -6;
      const rotateY = (x - centerX) / centerX * 6;

      card.style.transform =
        'perspective(800px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-4px)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });

})();
