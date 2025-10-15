// This is just to toggle the column grid layout...chale I have to make it look precise. WILL DELETE LATER!!!
document.addEventListener("keydown", (e) => {
  if (e.key === "g") {
    document.body.classList.toggle("show-grid");
  }
});

// This SHRINKS the header when scrolled
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    Headers.classList.add('shrink');
  } else {
    Headers.classList.remove('shrink');
  }
});

// Scroll to next section after hero section
function scrollToNextSection() {
  const nextSection = document.querySelector('.next-section');
  if (nextSection) {
    nextSection.scrollIntoView({ behavior: 'smooth' });
  }
}













































// --- SCROLL TO TOP BUTTON ---
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    scrollTopBtn.classList.add('show');
  } else {
    scrollTopBtn.classList.remove('show');
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

