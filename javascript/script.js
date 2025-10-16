// Dev tool: Press 'G' key to toggle grid overlay (remove in production)
document.addEventListener("keydown", (e) => {
  if (e.key === "g" || e.key === "G") {
    document.body.classList.toggle("show-grid");
  }
});

// Cache DOM elements for better performance
const header = document.querySelector('.site-header');
const scrollTopBtn = document.getElementById('scrollTopBtn');
const animatedElements = document.querySelectorAll('.scroll-animate');
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

// Scroll animation reveal function
const revealOnScroll = () => {
  animatedElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add('visible');
    }
  });
};

// Combined scroll handler for better performance
const handleScroll = () => {
  const scrollY = window.scrollY;
  
  // Header shrink effect
  if (scrollY > 100) {
    header.classList.add('shrink');
  } else {
    header.classList.remove('shrink');
  }
  
  // Scroll to top button visibility
  if (scrollY > 400) {
    scrollTopBtn.classList.add('show');
  } else {
    scrollTopBtn.classList.remove('show');
  }
  
  // Reveal scroll animations
  revealOnScroll();
};

// Throttled scroll event listener (runs every 50ms max)
let scrollTimeout;
window.addEventListener('scroll', () => {
  if (scrollTimeout) return;
  scrollTimeout = setTimeout(() => {
    handleScroll();
    scrollTimeout = null;
  }, 50);
});

// Run handlers on page load
window.addEventListener('load', () => {
  handleScroll();
  revealOnScroll();
});

// Scroll to next section smoothly
function scrollToNextSection() {
  const nextSection = document.querySelector('.next-section');
  if (nextSection) {
    nextSection.scrollIntoView();
  }
}

// Scroll to top button
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0 });
});

// Mobile menu toggle with accessibility
if (mobileMenuToggle && navLinks) {
  mobileMenuToggle.addEventListener('click', () => {
    const isExpanded = mobileMenuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = isExpanded ? 'hidden' : '';
  });
  
  // Close menu when clicking on a link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuToggle.classList.remove('active');
      navLinks.classList.remove('active');
      mobileMenuToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('active') && 
        !navLinks.contains(e.target) && 
        !mobileMenuToggle.contains(e.target)) {
      mobileMenuToggle.classList.remove('active');
      navLinks.classList.remove('active');
      mobileMenuToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
  
  // Close menu with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
      mobileMenuToggle.classList.remove('active');
      navLinks.classList.remove('active');
      mobileMenuToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}

// Image loading effect
document.querySelectorAll('.product-card img').forEach(img => {
  img.addEventListener('load', () => {
    img.classList.add('loaded');
  });
  
  // If already cached/loaded
  if (img.complete) {
    img.classList.add('loaded');
  }
});