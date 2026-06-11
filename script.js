/* ============================================
   LE'S AUTO REPAIR — JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  // --- Scroll Progress Bar ---
  const scrollProgress = document.getElementById('scrollProgress');
  window.addEventListener('scroll', function () {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    if (scrollProgress) scrollProgress.style.width = scrollPercent + '%';
  });

  // --- Open/Closed Indicator ---
  function updateOpenStatus() {
    const statusDot = document.getElementById('statusDot');
    const statusText = document.getElementById('statusText');
    if (!statusDot || !statusText) return;

    const now = new Date();
    const day = now.getDay();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const time = hours + minutes / 60;

    let isOpen = false;
    if (day >= 1 && day <= 5 && time >= 8 && time < 17.5) isOpen = true;
    if (day === 6 && time >= 8 && time < 14) isOpen = true;

    if (isOpen) {
      statusDot.classList.remove('closed');
      statusText.textContent = 'Open / Đang Mở';
    } else {
      statusDot.classList.add('closed');
      statusText.textContent = 'Closed / Đã Đóng';
    }
  }
  updateOpenStatus();
  setInterval(updateOpenStatus, 60000);

  // --- Navbar Scroll + Cultural Banner offset ---
  const navbar = document.getElementById('navbar');
  const culturalBanner = document.getElementById('culturalBanner');
  window.addEventListener('scroll', function () {
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  });

  // Adjust navbar position based on cultural banner
  if (culturalBanner && navbar) {
    navbar.classList.add('banner-visible');
  }

  // --- Cultural Banner Close ---
  const culturalClose = document.getElementById('culturalClose');
  if (culturalClose && culturalBanner) {
    culturalClose.addEventListener('click', function () {
      culturalBanner.style.display = 'none';
      if (navbar) navbar.classList.remove('banner-visible');
    });
  }

  // --- Mobile Menu ---
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', function () {
      mobileToggle.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileToggle.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Scroll Reveal ---
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  revealElements.forEach(function (el) { revealObserver.observe(el); });

  // --- Back to Top + Mobile CTA Bar ---
  const backToTop = document.getElementById('backToTop');
  const mobileCtaBar = document.getElementById('mobileCtaBar');
  window.addEventListener('scroll', function () {
    if (backToTop) backToTop.classList.toggle('visible', window.scrollY > 500);
    if (mobileCtaBar) mobileCtaBar.classList.toggle('visible', window.scrollY > 600);
  });
  if (backToTop) backToTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });

  // --- Form Validation ---
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('name');
      const phone = document.getElementById('phone');
      let isValid = true;

      if (name && !name.value.trim()) {
        name.classList.add('error');
        isValid = false;
      } else if (name) {
        name.classList.remove('error');
      }
      if (phone && !phone.value.trim()) {
        phone.classList.add('error');
        isValid = false;
      } else if (phone) {
        phone.classList.remove('error');
      }

      if (isValid) {
        contactForm.style.display = 'none';
        if (formSuccess) formSuccess.classList.add('show');
      }
    });
  }

  // --- Smooth scroll ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
      }
    });
  });
});