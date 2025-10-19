// PROMO POPUP & BANNER SYSTEM

// CONFIGURATION
const PROMO_CONFIG = {
  // Set to true to enable popup, false to disable
  popupEnabled: true,
  
  // Delay before showing popup (in milliseconds)
  popupDelay: 2000, // 2 seconds
  
  // Cookie expiry (in days) - popup won't show again until cookie expires
  cookieExpiry: 1, // 1 day
  
  // Cookie name
  cookieName: 'kingsfurniture_promo_seen'
};

// ACTIVE PROMO DATA
// Update this when you have a new promotion
const activePromo = {
  enabled: true, // Set to false to disable popup completely
  image: '../images/promo/promo-banner-main.webp', // Main popup image
  link: '../pages/contact.html', // Where to go when clicked
  altText: 'Kings Furniture Special Promotion'
};

// ALL PROMOS FOR HOMEPAGE SECTION
const allPromos = [
  {
    id: 1,
    title: 'New Year Sale',
    description: 'Get up to 25% off on all living room furniture. Limited time offer!',
    image: '../images/promo/promo-banner-main.webp',
    dateRange: 'Valid until January 1, 2026',
    active: true, // Badge will show if true
    link: '../pages/products.html?category=living-room'
  },
  {
    id: 2,
    title: 'Office Furniture Special',
    description: 'Upgrade your workspace with our premium office furniture collection at special prices.',
    image: '../images/promo/promo-1.webp',
    dateRange: 'Valid until October 13, 2025',
    active: false,
    link: '../pages/products.html?category=office'
  },
  {
    id: 3,
    title: 'Custom Design Discount',
    description: 'Get 15% off all custom furniture orders. Turn your vision into reality!',
    image: '../images/promo/promo-2.webp',
    dateRange: 'Valid until October 13, 2025',
    active: false,
    link: '../pages/contact.html'
  }
];

// COOKIE FUNCTIONS
function setCookie(name, value, days) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

function getCookie(name) {
  const nameEQ = name + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// POPUP FUNCTIONS
function showPromoPopup() {
  // Check if popup should be shown
  if (!PROMO_CONFIG.popupEnabled || !activePromo.enabled) {
    return;
  }

  // Check if user has already seen the popup
  if (getCookie(PROMO_CONFIG.cookieName)) {
    return;
  }

  const popup = document.getElementById('promoPopup');
  if (!popup) return;

  // Show popup after delay
  setTimeout(() => {
    popup.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Set cookie so popup doesn't show again
    setCookie(PROMO_CONFIG.cookieName, 'true', PROMO_CONFIG.cookieExpiry);
  }, PROMO_CONFIG.popupDelay);
}

function closePromoPopup() {
  const popup = document.getElementById('promoPopup');
  if (!popup) return;

  // Add closing animation
  popup.classList.add('closing');

  // Remove popup after animation
  setTimeout(() => {
    popup.classList.remove('active', 'closing');
    document.body.style.overflow = '';
  }, 400);
}

function handlePromoClick() {
  if (activePromo.link) {
    window.location.href = activePromo.link;
  }
}

// RENDER PROMO BANNERS ON HOMEPAGE
function renderPromoBanners() {
  const promoGrid = document.getElementById('promoGrid');
  if (!promoGrid) return;

  promoGrid.innerHTML = '';

  allPromos.forEach(promo => {
    const promoCard = document.createElement('div');
    promoCard.className = 'promo-card scroll-animate';
    promoCard.onclick = () => window.location.href = promo.link;

    promoCard.innerHTML = `
      <div class="promo-card-image">
        <img src="${promo.image}" alt="${promo.title}" loading="lazy" />
        ${promo.active ? '<div class="promo-badge">Active</div>' : ''}
      </div>
      <div class="promo-card-content">
        <h3 class="promo-card-title">${promo.title}</h3>
        <p class="promo-card-description">${promo.description}</p>
        <div class="promo-card-date">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          ${promo.dateRange}
        </div>
      </div>
    `;

    promoGrid.appendChild(promoCard);
  });

  // Lazy load images
  lazyLoadPromoImages();
}

// LAZY LOAD PROMO IMAGES
function lazyLoadPromoImages() {
  const images = document.querySelectorAll('.promo-card-image img, #promoPopupImage');
  
  images.forEach(img => {
    if (img.complete) {
      img.classList.add('loaded');
    } else {
      img.addEventListener('load', () => {
        img.classList.add('loaded');
      });
    }
  });
}

// SETUP EVENT LISTENERS
function setupPromoListeners() {
  // Popup close button
  const closeBtn = document.getElementById('promoPopupClose');
  if (closeBtn) {
    closeBtn.addEventListener('click', closePromoPopup);
  }

  // Popup overlay
  const overlay = document.getElementById('promoPopupOverlay');
  if (overlay) {
    overlay.addEventListener('click', closePromoPopup);
  }

  // Popup image click
  const popupImage = document.getElementById('promoPopupImage');
  if (popupImage) {
    popupImage.addEventListener('click', handlePromoClick);
  }

  // Close with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const popup = document.getElementById('promoPopup');
      if (popup && popup.classList.contains('active')) {
        closePromoPopup();
      }
    }
  });
}

// INITIALIZE
function initPromoSystem() {
  // Render promo banners if on homepage
  renderPromoBanners();
  
  // Setup event listeners
  setupPromoListeners();
  
  // Show popup
  showPromoPopup();
}

// Run on page load
window.addEventListener('load', initPromoSystem);

// ADMIN FUNCTION: Force show popup (for testing)
// Open browser console and type: showPromoPopupForce()
window.showPromoPopupForce = function() {
  // Delete cookie
  document.cookie = PROMO_CONFIG.cookieName + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  // Show popup immediately
  const popup = document.getElementById('promoPopup');
  if (popup) {
    popup.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};

// ADMIN FUNCTION: Hide all promos (for testing)
window.hidePromoPopup = function() {
  closePromoPopup();
};

// ADMIN FUNCTION: Clear promo cookie
window.clearPromoCookie = function() {
  document.cookie = PROMO_CONFIG.cookieName + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  console.log('Promo cookie cleared. Refresh page to see popup again.');
};