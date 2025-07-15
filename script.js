// 1. Friendly party-size guard
const sizeInput = document.querySelector('input[name="partySize"]');
if (sizeInput) {
  sizeInput.addEventListener('input', e => {
    const v = +e.target.value;
    if (v < 1) e.target.value = 1;
    if (v > 10) {
      e.target.value = 10;
      alert("Give us a heads-up if you’re bringing more than 10!");
    }
  });
}

// 2. Phone number validation and formatting
const phoneInput = document.querySelector('#phone-input');
if (phoneInput) {
  phoneInput.addEventListener('blur', e => {
    // Strip all non-digit characters
    const digitsOnly = e.target.value.replace(/\D/g, '');
    
    // Validate 10-digit US phone number
    if (digitsOnly.length === 10) {
      e.target.value = digitsOnly;
      e.target.setCustomValidity(''); // Clear any previous validation messages
    } else if (digitsOnly.length === 11 && digitsOnly.startsWith('1')) {
      // Handle numbers with country code (1)
      e.target.value = digitsOnly.substring(1);
      e.target.setCustomValidity('');
    } else if (digitsOnly.length > 0) {
      e.target.setCustomValidity('Please enter a valid 10-digit phone number');
    }
  });
  
  // Real-time input validation
  phoneInput.addEventListener('input', e => {
    // Remove any validation message while typing
    e.target.setCustomValidity('');
  });
}

// 2. Little confetti pop on success page
if (location.pathname.endsWith('success.html')) {
  import('https://cdn.skypack.dev/canvas-confetti').then(({ default: confetti }) => {
    confetti({ particleCount: 150, spread: 70 });
  });
}

/* === +/- party-size control === */
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.number-input').forEach(wrapper => {
    const input = wrapper.querySelector('input[name="partySize"]');
    if (!input) return;

    const minus = wrapper.querySelector('.minus');
    const plus  = wrapper.querySelector('.plus');
    const min   = parseInt(input.min || 1, 10);
    const max   = parseInt(input.max || 99, 10);

    const update = () => {
      const val = parseInt(input.value || 0, 10);
      minus.disabled = val <= min;
      plus.disabled  = val >= max;
    };

    minus.addEventListener('click', () => {
      const val = parseInt(input.value || 0, 10) - 1;
      if (val >= min) {
        input.value = val;
        update();
      }
    });

    plus.addEventListener('click', () => {
      const val = parseInt(input.value || 0, 10) + 1;
      if (val <= max) {
        input.value = val;
        update();
      }
    });

    // initialize button states on load
    update();
  });
});

// 1. Hamburger menu functionality
const hamburgerBtn = document.querySelector('#hamburger-btn');
const navOverlay = document.querySelector('#nav-overlay');

if (hamburgerBtn && navOverlay) {
  hamburgerBtn.addEventListener('click', () => {
    hamburgerBtn.classList.toggle('active');
    navOverlay.classList.toggle('active');
  });

  // Close menu when clicking on overlay
  navOverlay.addEventListener('click', (e) => {
    if (e.target === navOverlay) {
      hamburgerBtn.classList.remove('active');
      navOverlay.classList.remove('active');
    }
  });

  // Close menu when pressing Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navOverlay.classList.contains('active')) {
      hamburgerBtn.classList.remove('active');
      navOverlay.classList.remove('active');
    }
  });
}