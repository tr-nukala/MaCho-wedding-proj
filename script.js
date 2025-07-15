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