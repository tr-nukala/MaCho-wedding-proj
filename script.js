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

// 3. Little confetti pop on success page
if (location.pathname.endsWith('success.html')) {
  import('https://cdn.skypack.dev/canvas-confetti').then(({ default: confetti }) => {
    confetti({ particleCount: 150, spread: 70 });
  });
}

/* === +/- number input controls === */
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.number-input').forEach(wrapper => {
    const input = wrapper.querySelector('input[type="number"]');
    if (!input) return;

    const minus = wrapper.querySelector('.minus');
    const plus  = wrapper.querySelector('.plus');
    const min   = parseInt(input.min || 0, 10);
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

// 4. Countdown timer for wedding date
function updateCountdown() {
  const weddingDate = new Date('2024-08-09T11:35:00').getTime();
  const now = new Date().getTime();
  const timeLeft = weddingDate - now;

  if (timeLeft > 0) {
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');

    if (daysElement) daysElement.textContent = days;
    if (hoursElement) hoursElement.textContent = hours;
    if (minutesElement) minutesElement.textContent = minutes;
  } else {
    // Wedding has passed
    const countdownElement = document.getElementById('countdown');
    if (countdownElement) {
      countdownElement.innerHTML = '<div class="celebration">🎉 We\'re Married! 🎉</div>';
    }
  }
}

// Update countdown on page load and every minute
if (document.getElementById('countdown')) {
  updateCountdown();
  setInterval(updateCountdown, 60000); // Update every minute
}
