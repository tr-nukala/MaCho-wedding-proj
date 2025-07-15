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