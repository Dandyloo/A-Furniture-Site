// URL PARAMETER HANDLING
function getURLParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

function setURLParameter(name, value) {
  const url = new URL(window.location);
  if (value === 'all' || !value) {
    url.searchParams.delete(name);
  } else {
    url.searchParams.set(name, value);
  }
  window.history.pushState({}, '', url);
}

// INITIALIZE - UPDATE THE EXISTING init() FUNCTION
function init() {
  // Check for URL parameters on page load
  const categoryParam = getURLParameter('category');
  const searchParam = getURLParameter('search');
  
  // Set filters from URL
  if (categoryParam) {
    categoryFilter.value = categoryParam;
  }
  if (searchParam) {
    searchInput.value = searchParam;
  }
  
  // Apply filters and render
  filterProducts();
  setupEventListeners();
  
  // Scroll to products section if coming from a link
  if (categoryParam || searchParam) {
    setTimeout(() => {
      document.querySelector('.products-section').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  }
}

// UPDATE THE EXISTING filterProducts() FUNCTION
function filterProducts() {
  const category = categoryFilter.value;
  const searchTerm = searchInput.value.toLowerCase().trim();
  
  let filtered = [...productsDatabase];
  
  // Filter by category
  if (category !== 'all') {
    filtered = filtered.filter(p => p.category === category);
  }
  
  // Filter by search
  if (searchTerm) {
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(searchTerm) ||
      p.description.toLowerCase().includes(searchTerm) ||
      categoryNames[p.category].toLowerCase().includes(searchTerm)
    );
  }
  
  // Update URL parameters
  setURLParameter('category', category);
  setURLParameter('search', searchTerm);
  
  currentProducts = filtered;
  renderProducts(currentProducts);
}

// PRODUCTS DATABASE
// Add all your products here. Each product can have multiple images.
const productsDatabase = [
  // LIVING ROOM PRODUCTS
  {
    id: 1,
    name: "Modern Living Set",
    category: "living-room",
    images: [
      "../images/products/living-room/living-set-2a.webp",
      "../images/products/living-room/living-set-2b.webp",
      "../images/products/living-room/living-set-2c.webp",
      "../images/products/living-room/living-set-2d.webp"
    ],
    description: "Elegant modern living room set featuring comfortable seating and contemporary design. Perfect for creating a welcoming space for family and guests."
  },
  {
    id: 2,
    name: "Premium Grey Sofa Set",
    category: "living-room",
    images: [
      "../images/products/living-room/living-set-10a.webp"
    ],
    description: "Luxurious grey upholstered sofa set with matching coffee table. Designed for ultimate comfort and style in your living space."
  },
  
  // BEDROOM PRODUCTS
  {
    id: 3,
    name: "Classic Bedroom Set",
    category: "bedroom",
    images: [
      "../images/products/bedroom/bedroom-9b.webp"
    ],
    description: "Complete bedroom furniture set including bed frame, nightstands, and elegant finish. Creates a peaceful retreat for rest and relaxation."
  },
  
  // KITCHEN PRODUCTS
  {
    id: 4,
    name: "Contemporary Kitchen Set",
    category: "kitchen",
    images: [
      "../images/products/kitchen/kitchen-set-16c.jpg"
    ],
    description: "Modern kitchen cabinetry and furniture designed for functionality and style. Maximizes storage while maintaining a clean aesthetic."
  },
  
  // DINING PRODUCTS
  {
    id: 5,
    name: "Elegant Dining Set",
    category: "dining",
    images: [
      "../images/products/dining/dining-1a.webp"
    ],
    description: "Beautiful dining table with matching chairs. Perfect for family meals and entertaining guests in style."
  },
  
  // OFFICE PRODUCTS
  {
    id: 6,
    name: "Executive Office Set",
    category: "office",
    images: [
      "../images/products/office/office-set-2b.webp"
    ],
    description: "Professional office furniture including desk and ergonomic chair. Designed to boost productivity and comfort during work hours."
  },

  // ADD MORE PRODUCTS HERE
  // Copy the template below and fill in your product details:
  /*
  {
    id: 7, // Increment this number
    name: "Product Name",
    category: "living-room", // Options: living-room, bedroom, dining, office, kitchen
    images: [
      "../images/products/category/image1.jpg",
      "../images/products/category/image2.jpg", // Add multiple images for different angles
      "../images/products/category/image3.jpg"
    ],
    description: "Product description goes here. Describe the features, materials, and benefits."
  },
  */
];

// DOM ELEMENTS
const productsGrid = document.getElementById('productsGrid');
const categoryFilter = document.getElementById('categoryFilter');
const searchInput = document.getElementById('searchInput');
const currentCount = document.getElementById('currentCount');
const noResults = document.getElementById('noResults');
const productModal = document.getElementById('productModal');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalMainImage = document.getElementById('modalMainImage');
const modalCategory = document.getElementById('modalCategory');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalWhatsapp = document.getElementById('modalWhatsapp');
const thumbnailStrip = document.getElementById('thumbnailStrip');

// STATE
let currentProducts = [...productsDatabase];
let currentProduct = null;

// CATEGORY NAMES
const categoryNames = {
  'living-room': 'Living Room',
  'bedroom': 'Bedroom',
  'dining': 'Dining',
  'office': 'Office',
  'kitchen': 'Kitchen'
};

// INITIALIZE
function init() {
  renderProducts(currentProducts);
  setupEventListeners();
}

// RENDER PRODUCTS
function renderProducts(products) {
  productsGrid.innerHTML = '';
  
  if (products.length === 0) {
    noResults.style.display = 'block';
    productsGrid.style.display = 'none';
  } else {
    noResults.style.display = 'none';
    productsGrid.style.display = 'grid';
    
    products.forEach(product => {
      const productCard = createProductCard(product);
      productsGrid.appendChild(productCard);
    });
  }
  
  // Update count
  currentCount.textContent = products.length;
  
  // Lazy load images
  lazyLoadImages();
}

// CREATE PRODUCT CARD
function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'product-item scroll-animate';
  card.onclick = () => openModal(product);
  
  const hasMultipleImages = product.images.length > 1;
  
  card.innerHTML = `
    <div class="product-image-wrapper">
      <img src="${product.images[0]}" alt="${product.name}" loading="lazy" />
      ${hasMultipleImages ? `
        <div class="images-badge">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle>
            <polyline points="21 15 16 10 5 21"></polyline>
          </svg>
          ${product.images.length} photos
        </div>
      ` : ''}
    </div>
    <div class="product-info">
      <div class="product-category">${categoryNames[product.category]}</div>
      <h3 class="product-name">${product.name}</h3>
    </div>
  `;
  
  return card;
}

// FILTER PRODUCTS
function filterProducts() {
  const category = categoryFilter.value;
  const searchTerm = searchInput.value.toLowerCase().trim();
  
  let filtered = [...productsDatabase];
  
  // Filter by category
  if (category !== 'all') {
    filtered = filtered.filter(p => p.category === category);
  }
  
  // Filter by search
  if (searchTerm) {
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(searchTerm) ||
      p.description.toLowerCase().includes(searchTerm) ||
      categoryNames[p.category].toLowerCase().includes(searchTerm)
    );
  }
  
  currentProducts = filtered;
  renderProducts(currentProducts);
}

// OPEN MODAL
function openModal(product) {
  currentProduct = product;
  
  // Set content
  modalCategory.textContent = categoryNames[product.category];
  modalTitle.textContent = product.name;
  modalDescription.textContent = product.description;
  modalMainImage.src = product.images[0];
  modalMainImage.alt = product.name;
  
  // Create thumbnails if multiple images
  thumbnailStrip.innerHTML = '';
  if (product.images.length > 1) {
    product.images.forEach((img, index) => {
      const thumb = document.createElement('div');
      thumb.className = `thumbnail ${index === 0 ? 'active' : ''}`;
      thumb.innerHTML = `<img src="${img}" alt="${product.name} - View ${index + 1}" />`;
      thumb.onclick = () => selectThumbnail(img, thumb);
      thumbnailStrip.appendChild(thumb);
    });
  }
  
  // Setup WhatsApp
  const whatsappMessage = `Hi! I'm interested in the ${product.name} from your ${categoryNames[product.category]} collection.`;
  const whatsappNumber = '233XXXXXXXXX'; // Replace with actual number
  modalWhatsapp.onclick = () => {
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
  };
  
  // Show modal
  productModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// SELECT THUMBNAIL
function selectThumbnail(imageSrc, thumbElement) {
  modalMainImage.src = imageSrc;
  
  // Update active state
  document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
  thumbElement.classList.add('active');
}

// CLOSE MODAL
function closeModal() {
  productModal.classList.remove('active');
  document.body.style.overflow = '';
  currentProduct = null;
}

// LAZY LOAD IMAGES
function lazyLoadImages() {
  const images = document.querySelectorAll('.product-item img');
  
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
function setupEventListeners() {
  // Filter listeners
  categoryFilter.addEventListener('change', filterProducts);
  searchInput.addEventListener('input', filterProducts);
  
  // Modal listeners
  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', closeModal);
  
  // Escape key to close modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && productModal.classList.contains('active')) {
      closeModal();
    }
  });
  
  // Prevent modal content click from closing
  document.querySelector('.modal-content').addEventListener('click', (e) => {
    e.stopPropagation();
  });
}

// SCROLL ANIMATIONS
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe scroll animations on load
window.addEventListener('load', () => {
  document.querySelectorAll('.scroll-animate').forEach(el => {
    observer.observe(el);
  });
});

// Re-observe after filtering
const originalRenderProducts = renderProducts;
renderProducts = function(products) {
  originalRenderProducts(products);
  setTimeout(() => {
    document.querySelectorAll('.product-item').forEach(el => {
      observer.observe(el);
    });
  }, 100);
};

// INITIALIZE APP
init();