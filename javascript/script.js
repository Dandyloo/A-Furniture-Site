// This is just to toggle the column grid layout...chale I have to make it look precise. WILL DELETE LATER!!!
document.addEventListener("keydown", (e) => {
  if (e.key === "g") {
    document.body.classList.toggle("show-grid");
  }
});

// This SHRINKS the header when scrolled
const header = document.querySelector('.site-header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    header.classList.add('shrink');
  } else {
    header.classList.remove('shrink');
  }
});

// Scroll to next section after hero section
function scrollToNextSection() {
  const nextSection = document.querySelector('.next-section');
  if (nextSection) {
    nextSection.scrollIntoView(); // No need for { behavior: 'smooth' }
  }
}

// Scroll animation for elements
const animatedElements = document.querySelectorAll('.scroll-animate');

let scrollTimeout;
const revealOnScroll = () => {
  animatedElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add('visible');
    }
  });
};

window.addEventListener('scroll', () => {
  if (scrollTimeout) return;
  scrollTimeout = setTimeout(() => {
    revealOnScroll();
    scrollTimeout = null;
  }, 100);
});

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });
  
  // Close menu when clicking on a link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuToggle.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
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
  window.scrollTo({ top: 0 }); // No need for behavior: 'smooth'
});