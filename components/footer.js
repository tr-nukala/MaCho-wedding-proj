// Common footer loader
async function loadFooter() {
  try {
    const response = await fetch('components/footer.html');
    const footerHTML = await response.text();
    
    // Find existing footer and replace it
    const existingFooter = document.querySelector('footer');
    if (existingFooter) {
      existingFooter.outerHTML = footerHTML;
    } else {
      // If no footer exists, append to body
      document.body.insertAdjacentHTML('beforeend', footerHTML);
    }
  } catch (error) {
    console.log('Footer component not found, using inline footer');
  }
}

// Load footer when DOM is ready
document.addEventListener('DOMContentLoaded', loadFooter);
