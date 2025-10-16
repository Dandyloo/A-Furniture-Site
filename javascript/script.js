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

// Scroll animation for elements
const animatedElements = document.querySelectorAll('.scroll-animate');

const revealOnScroll = () => {
  animatedElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add('visible');
    }
  });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);














































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

