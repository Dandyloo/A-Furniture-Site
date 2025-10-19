// PROMO SYSTEM JAVASCRIPT

// ============================================
// CONFIGURATION
// ============================================

const PROMO_CONFIG = {
  // Banner Slider Settings
  slider: {
    autoPlayInterval: 5000, // 5 seconds per slide
    pauseOnHover: true,
    slides: [
      {
        image:
          "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760868232/promo-banner-1_jlfgvg.jpg",
        alt: "Special Promotion 1",
      },
      {
        image:
          "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760868228/promo-banner-2_zhwo3m.jpg",
        alt: "Special Promotion 2",
      },
      {
        image:
          "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760868229/promo-banner-3_vi0tu4.jpg.jpg",
        alt: "Special Promotion 3",
      },
    ],
  },

  // Corner Notification Settings
  notification: {
    showDelay: 3000, // Show after 3 seconds
    image:
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760868232/promo-banner-1_jlfgvg.jpg",
    badge: "Limited Offer",
    title: "Special Furniture Sale!",
    text: "Get up to 30% off on selected items. Limited time only!",
    ctaText: "View Details",
    ctaLink: "./pages/products.html",
  },
};

// ============================================
// PROMO BANNER SLIDER
// ============================================

class PromoSlider {
  constructor(containerSelector, config) {
    this.container = document.querySelector(containerSelector);
    if (!this.container) return;

    this.config = config;
    this.currentSlide = 0;
    this.autoPlayTimer = null;
    this.isUserInteracting = false;

    this.init();
  }

  init() {
    this.buildSlider();
    this.attachEventListeners();
    this.startAutoPlay();
  }

  buildSlider() {
    // Build slides
    const slidesHTML = this.config.slides
      .map(
        (slide) => `
      <div class="promo-slide">
        <img src="${slide.image}" alt="${slide.alt}" loading="lazy" />
      </div>
    `
      )
      .join("");

    // Build dots
    const dotsHTML = this.config.slides
      .map(
        (_, index) => `
      <button class="promo-slider-dot ${
        index === 0 ? "active" : ""
      }" data-slide="${index}" aria-label="Go to slide ${index + 1}"></button>
    `
      )
      .join("");

    // Insert HTML
    this.container.innerHTML = `
      <div class="promo-slider">
        <div class="promo-slides">
          ${slidesHTML}
        </div>
        
        <button class="promo-slider-nav prev" aria-label="Previous slide">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        
        <button class="promo-slider-nav next" aria-label="Next slide">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
        
        <div class="promo-slider-dots">
          ${dotsHTML}
        </div>
      </div>
    `;

    // Cache DOM elements
    this.slidesContainer = this.container.querySelector(".promo-slides");
    this.slides = this.container.querySelectorAll(".promo-slide");
    this.dots = this.container.querySelectorAll(".promo-slider-dot");
    this.prevBtn = this.container.querySelector(".promo-slider-nav.prev");
    this.nextBtn = this.container.querySelector(".promo-slider-nav.next");
  }

  attachEventListeners() {
    // Navigation buttons
    this.prevBtn.addEventListener("click", () => this.prevSlide());
    this.nextBtn.addEventListener("click", () => this.nextSlide());

    // Dots
    this.dots.forEach((dot) => {
      dot.addEventListener("click", (e) => {
        const slideIndex = parseInt(e.target.dataset.slide);
        this.goToSlide(slideIndex);
      });
    });

    // Pause on hover
    if (this.config.pauseOnHover) {
      this.container.addEventListener("mouseenter", () => this.pauseAutoPlay());
      this.container.addEventListener("mouseleave", () =>
        this.resumeAutoPlay()
      );
    }

    // Click to open popup
    this.slides.forEach((slide) => {
      slide.addEventListener("click", () => this.openPopup());
    });

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (!this.isUserInteracting) return;
      if (e.key === "ArrowLeft") this.prevSlide();
      if (e.key === "ArrowRight") this.nextSlide();
    });
  }

  goToSlide(index) {
    this.isUserInteracting = true;
    this.currentSlide = index;

    // Update slides position
    const offset = -index * 100;
    this.slidesContainer.style.transform = `translateX(${offset}%)`;

    // Update dots
    this.dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });

    // Reset auto-play timer
    this.resetAutoPlay();
  }

  nextSlide() {
    const nextIndex = (this.currentSlide + 1) % this.config.slides.length;
    this.goToSlide(nextIndex);
  }

  prevSlide() {
    const prevIndex =
      (this.currentSlide - 1 + this.config.slides.length) %
      this.config.slides.length;
    this.goToSlide(prevIndex);
  }

  startAutoPlay() {
    this.autoPlayTimer = setInterval(() => {
      if (!this.isUserInteracting) {
        this.nextSlide();
      }
    }, this.config.autoPlayInterval);
  }

  pauseAutoPlay() {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = null;
    }
  }

  resumeAutoPlay() {
    if (!this.autoPlayTimer) {
      this.startAutoPlay();
    }
  }

  resetAutoPlay() {
    this.pauseAutoPlay();
    this.resumeAutoPlay();
  }

  openPopup() {
    const popup = document.getElementById("promoPopup");
    const popupImage = document.getElementById("promoPopupImage");

    if (popup && popupImage) {
      popupImage.src = this.config.slides[this.currentSlide].image;
      popup.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  }
}

// ============================================
// CORNER NOTIFICATION
// ============================================

class PromoNotification {
  constructor(config) {
    this.config = config;
    this.notification = null;
    this.isDismissed = false;

    this.init();
  }

  init() {
    // Check if user has already dismissed today
    if (this.checkDismissedToday()) {
      return;
    }

    this.buildNotification();
    this.attachEventListeners();

    // Show after delay
    setTimeout(() => this.show(), this.config.showDelay);
  }

  buildNotification() {
    const notificationHTML = `
      <div class="promo-notification" id="promoNotification">
        <button class="promo-notification-close" aria-label="Close notification">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        
        <div class="promo-notification-image">
          <img src="${this.config.image}" alt="Promotion" />
          <div class="promo-notification-badge">${this.config.badge}</div>
        </div>
        
        <div class="promo-notification-content">
          <h3 class="promo-notification-title">${this.config.title}</h3>
          <p class="promo-notification-text">${this.config.text}</p>
          <a href="${this.config.ctaLink}" class="promo-notification-cta">
            ${this.config.ctaText}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML("beforeend", notificationHTML);
    this.notification = document.getElementById("promoNotification");
  }

  attachEventListeners() {
    const closeBtn = this.notification.querySelector(
      ".promo-notification-close"
    );

    // Close button
    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      this.dismiss();
    });

    // Click notification to view details
    this.notification.addEventListener("click", () => {
      window.location.href = this.config.ctaLink;
    });
  }

  show() {
    if (this.notification && !this.isDismissed) {
      this.notification.classList.add("show");
    }
  }

  dismiss() {
    this.isDismissed = true;
    this.notification.classList.add("dismissed");
    this.saveDismissedState();

    // Remove from DOM after animation
    setTimeout(() => {
      if (this.notification) {
        this.notification.remove();
      }
    }, 500);
  }

  saveDismissedState() {
    const today = new Date().toDateString();
    localStorage.setItem("promoNotificationDismissed", today);
  }

  checkDismissedToday() {
    const dismissedDate = localStorage.getItem("promoNotificationDismissed");
    const today = new Date().toDateString();
    return dismissedDate === today;
  }
}

// ============================================
// POPUP MODAL
// ============================================

class PromoPopup {
  constructor() {
    this.popup = document.getElementById("promoPopup");
    if (!this.popup) return;

    this.overlay = document.getElementById("promoPopupOverlay");
    this.closeBtn = document.getElementById("promoPopupClose");

    this.attachEventListeners();
  }

  attachEventListeners() {
    // Close button
    this.closeBtn.addEventListener("click", () => this.close());

    // Overlay click
    this.overlay.addEventListener("click", () => this.close());

    // Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.popup.classList.contains("active")) {
        this.close();
      }
    });
  }

  close() {
    this.popup.classList.remove("active");
    document.body.style.overflow = "";
  }
}

// ============================================
// INITIALIZE ON PAGE LOAD
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Promo Slider (only on homepage)
  if (document.querySelector(".promo-slider-container")) {
    new PromoSlider(".promo-slider-container", PROMO_CONFIG.slider);
  }

  // Initialize Corner Notification (on all pages)
  new PromoNotification(PROMO_CONFIG.notification);

  // Initialize Popup Modal
  new PromoPopup();
});
