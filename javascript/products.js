// URL PARAMETER HANDLING
function getURLParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

function setURLParameter(name, value) {
  const url = new URL(window.location);
  if (value === "all" || !value) {
    url.searchParams.delete(name);
  } else {
    url.searchParams.set(name, value);
  }
  window.history.pushState({}, "", url);
}

// INITIALIZE - UPDATE THE EXISTING init() FUNCTION
function init() {
  // Check for URL parameters on page load
  const categoryParam = getURLParameter("category");
  const searchParam = getURLParameter("search");

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
      document.querySelector(".products-section").scrollIntoView({
        behavior: "smooth",
        block: "start",
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
  if (category !== "all") {
    filtered = filtered.filter((p) => p.category === category);
  }

  // Filter by search
  if (searchTerm) {
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm) ||
        categoryNames[p.category].toLowerCase().includes(searchTerm)
    );
  }

  // Update URL parameters
  setURLParameter("category", category);
  setURLParameter("search", searchTerm);

  currentProducts = filtered;
  renderProducts(currentProducts);
}

// PRODUCTS DATABASE
// Add all your products here. Each product can have multiple images.
const productsDatabase = [
  // LIVING ROOM PRODUCTS
  {
    id: 1,
    name: "LR-001",
    category: "living-room",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760869686/living-set-10a_mo70iy.webp",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760869688/living-set-10b_emsur9.webp",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760869691/living-set-10c_xhqfhn.webp",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760869694/living-set-10d_eyvmfc.webp",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760869779/living-set-10e_crwhoe.webp",
    ],
    description: "We'll place a description here",
  },
  {
    id: 2,
    name: "LR-002",
    category: "living-room",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760869794/living-set-11_gokh81.webp",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760869819/living-set-12_nvjbdg.webp",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760869822/living-set-13_u57pk4.webp",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760869825/living-set-14_ofyj9n.webp",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760869827/living-set-15_lopddu.webp",
    ],
    description: "We'll place a description here",
  },
  {
    id: 3,
    name: "LR-003",
    category: "living-room",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760869831/living-set-16a_luw3am.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760869933/living-set-16b_v6mbvl.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760870004/living-set-16c_u68ry4.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760870125/living-set-16d_c5n34o.webp",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760870128/living-set-16e_asuti3.webp",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760870133/living-set-16f_ekcluu.webp",
    ],
    description: "We'll place a description here",
  },
  {
    id: 4,
    name: "LR-004",
    category: "living-room",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760870209/living-set-1a_ozaxju.webp",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760870212/living-set-1b_nzy3bz.webp",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760870215/living-set-1c_pzxhuq.webp",
    ],
    description: "We'll place a description here",
  },
  {
    id: 5,
    name: "LR-005",
    category: "living-room",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760870218/living-set-2a_kiqhgr.webp",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760870221/living-set-2b_qzg4uw.webp",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760870224/living-set-2c_cjygrz.webp",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760870226/living-set-2d_mxspz9.webp",
    ],
    description: "We'll place a description here",
  },
  {
    id: 6,
    name: "LR-006",
    category: "living-room",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760870229/living-set-3a_umclfq.webp",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760870232/living-set-3b_jx9ll4.webp",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760870235/living-set-3c_swnufn.webp",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760870238/living-set-3d_ko9i4i.webp",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760870239/living-set-3e_exl9e3.webp",
    ],
    description: "We'll place a description here",
  },
  {
    id: 7,
    name: "LR-007",
    category: "living-room",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760870242/living-set-4a_kquzkl.webp",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760870244/living-set-4b_owba0e.webp",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760870247/living-set-4c_muwg5s.webp",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760870250/living-set-4d_qhtmzx.webp",
    ],
    description: "We'll place a description here",
  },
  {
    id: 8,
    name: "LR-008",
    category: "living-room",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760870252/living-set-5a_jwgeqp.webp",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760870255/living-set-5b_dk1mlx.webp",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760870257/living-set-5c_z5vris.webp",
    ],
    description: "We'll place a description here",
  },
  {
    id: 9,
    name: "LR-009",
    category: "living-room",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760870260/living-set-6a_tentud.webp",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760870262/living-set-6b_yuf9eg.webp",
    ],
    description: "We'll place a description here",
  },
  {
    id: 10,
    name: "LR-010",
    category: "living-room",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760870265/living-set-7a_mhswjk.webp",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760870268/living-set-7b_kqtmup.webp",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760870271/living-set-7c_qcri1f.webp",
    ],
    description: "We'll place a description here",
  },
  {
    id: 11,
    name: "LR-011",
    category: "living-room",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760870273/living-set-8a_wjfxgr.webp",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760870275/living-set-8b_yj4bv4.webp",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760870278/living-set-8c_g8gupq.webp",
    ],
    description: "We'll place a description here",
  },
  {
    id: 12,
    name: "LR-012",
    category: "living-room",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760870281/living-set-9a_pf4dtd.webp",
    ],
    description: "We'll place a description here",
  },

  // BEDROOM PRODUCTS
  {
    id: 14,
    name: "BR-001",
    category: "bedroom",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760870287/bedroom-10a.jpg_lmmrho.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760870291/bedroom-10b.jpg_jr4snp.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760870297/bedroom-10c.jpg_cqef6u.jpg",
    ],
    description: "We'll place a description here",
  },
  {
    id: 16,
    name: "BR-002",
    category: "bedroom",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760870320/bedroom-12_vq6ou0.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760870322/bedroom-13_jhrxid.jpg",
    ],
    description: "We'll place a description here",
  },
  {
    id: 17,
    name: "BR-003",
    category: "bedroom",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760870325/bedroom-2a_krlum9.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760870328/bedroom-2b_bic3wt.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760870330/bedroom-2c_akyezm.jpg",
    ],
    description: "We'll place a description here",
  },
  {
    id: 18,
    name: "BR-004",
    category: "bedroom",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760870336/bedroom-4_m5tnix.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760870334/bedroom-3a_ekdb5h.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760870338/bedroom-5_v9ohj3.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760870340/bedroom-6_hf7fro.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760870342/bedroom-7_hwnybt.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760870345/bedroom-8_g5tnnc.jpg",
    ],
    description: "We'll place a description here",
  },
  // KITCHEN PRODUCTS
  {
    id: 19,
    name: "KS-001",
    category: "kitchen",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760868320/kitchen-set-10a_yo8dqf.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760868322/kitchen-set-10b_hg0j5b.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760868326/kitchen-set-10c_dopelp.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760868328/kitchen-set-10d_ea2znt.jpg",
    ],
    description: "We'll place a description here",
  },
  {
    id: 20,
    name: "KS-002",
    category: "kitchen",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760868329/kitchen-set-11a_vbvcru.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760868332/kitchen-set-11b_aknjim.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760868334/kitchen-set-11c_mqv5wi.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760868337/kitchen-set-11d_pxtef4.jpg",
    ],
    description: "We'll place a description here",
  },
  {
    id: 21,
    name: "KS-003",
    category: "kitchen",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760868340/kitchen-set-12a_mqyobe.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760868342/kitchen-set-12b_cxsx8y.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760868345/kitchen-set-12c_rnrrco.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760868347/kitchen-set-12d_ko21o8.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760868350/kitchen-set-12e_xmp8u8.jpg",
    ],
    description: "We'll place a description here",
  },
  {
    id: 22,
    name: "KS-004",
    category: "kitchen",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760868397/kitchen-set-13a_oisbcd.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760868399/kitchen-set-13b_ia2e6z.jpg",
    ],
    description: "We'll place a description here",
  },
  {
    id: 23,
    name: "KS-005",
    category: "kitchen",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760868403/kitchen-set-14a_knwhop.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760868406/kitchen-set-14b_relzsk.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760868409/kitchen-set-14c_hqoace.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760868434/kitchen-set-14d_oxqup5.jpg",
    ],
    description: "We'll place a description here",
  },
  {
    id: 24,
    name: "KS-006",
    category: "kitchen",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760868437/kitchen-set-15a_rgvjyg.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760868439/kitchen-set-15b_sjh3wr.jpg",
    ],
    description: "We'll place a description here",
  },
  {
    id: 25,
    name: "KS-007",
    category: "kitchen",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760868443/kitchen-set-16a_cgw91h.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760868446/kitchen-set-16b_mbvuvl.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760868449/kitchen-set-16c_ijwj2b.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760868452/kitchen-set-16d_klefpw.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760868482/kitchen-set-16e_bd5l7b.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760868645/kitchen-set-16f_qquqxp.jpg",
    ],
    description: "We'll place a description here",
  },
  {
    id: 26,
    name: "KS-008",
    category: "kitchen",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760868804/kitchen-set-1a_poezlm.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760868811/kitchen-set-1b_a31lri.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760868813/kitchen-set-1c_d0h0tx.jpg",
    ],
    description: "We'll place a description here",
  },
  {
    id: 27,
    name: "KS-009",
    category: "kitchen",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760868818/kitchen-set-2a_r8onlx.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760868821/kitchen-set-2b_auobjx.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760868823/kitchen-set-2c_mxdpru.jpg",
      "",
    ],
    description: "We'll place a description here",
  },
  {
    id: 28,
    name: "KS-010",
    category: "kitchen",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760868843/kitchen-set-3a_pxgwh2.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760868878/kitchen-set-3b_ujv14f.jpg",
    ],
    description: "We'll place a description here",
  },
  {
    id: 29,
    name: "KS-011",
    category: "kitchen",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760868896/kitchen-set-4a_oq7eog.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760868924/kitchen-set-4b_zfpf3u.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760868987/kitchen-set-4c_mvkzmy.jpg",
    ],
    description: "We'll place a description here",
  },
  {
    id: 30,
    name: "KS-012",
    category: "kitchen",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760869006/kitchen-set-5a_rlu13b.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760869009/kitchen-set-5b_fik8yk.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760869012/kitchen-set-5c_vehirv.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760869014/kitchen-set-5d_wjnne2.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760869017/kitchen-set-5e_lvw9wj.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760869019/kitchen-set-5f_jlanve.jpg",
    ],
    description: "We'll place a description here",
  },
  {
    id: 31,
    name: "KS-013",
    category: "kitchen",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760869024/kitchen-set-6a_d1d0dg.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760869027/kitchen-set-6b_rhdavf.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760869030/kitchen-set-6c_wdzkvj.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760869033/kitchen-set-6d_amabyw.jpg",
    ],
    description: "We'll place a description here",
  },
  {
    id: 32,
    name: "KS-014",
    category: "kitchen",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760869181/kitchen-set-7a_hfhaqk.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760869342/kitchen-set-7b_bgkpgt.jpg",
    ],
    description: "We'll place a description here",
  },
  {
    id: 33,
    name: "KS-015",
    category: "kitchen",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760869502/kitchen-set-8a_sagbpj.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760869564/kitchen-set-8b_yf0mgv.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760869567/kitchen-set-8c_idz7ao.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760869570/kitchen-set-8d_zjnuv7.jpg",
    ],
    description: "We'll place a description here",
  },
  {
    id: 34,
    name: "KS-016",
    category: "kitchen",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760869603/kitchen-set-9a_f5imot.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760869677/kitchen-set-9b_kchaay.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760869679/kitchen-set-9c_kkdhxp.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760869683/kitchen-set-9d_hovibx.jpg",
    ],
    description: "We'll place a description here",
  },

  // DINING PRODUCTS
  {
    id: 35,
    name: "DS-001",
    category: "dining",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760870363/dining-1a_eqzouv.webp",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760870369/dining-1b_c6akhi.jpg",
    ],
    description:
      "Beautiful dining table with matching chairs. Perfect for family meals and entertaining guests in style.",
  },

  // OFFICE PRODUCTS
  {
    id: 36,
    name: "OS-001",
    category: "office",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760868263/office-set-1a_d5dxe1.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760868266/office-set-1b_viel79.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760868268/office-set-1c_rly3li.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760868270/office-set-1d_is2qu4.jpg",
    ],
    description:
      "Professional office furniture including desk and ergonomic chair. Designed to boost productivity and comfort during work hours.",
  },
  {
    id: 37,
    name: "OS-002",
    category: "office",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760868275/office-set-2b_y8sjqv.webp",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760868273/office-set-2a_r1g3gq.jpg",
    ],
    description:
      "Professional office furniture including desk and ergonomic chair. Designed to boost productivity and comfort during work hours.",
  },
  {
    id: 38,
    name: "OS-003",
    category: "office",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760868278/office-set-3a_efth2r.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760868280/office-set-3b_nsqwzj.jpg",
    ],
    description:
      "Professional office furniture including desk and ergonomic chair. Designed to boost productivity and comfort during work hours.",
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
const productsGrid = document.getElementById("productsGrid");
const categoryFilter = document.getElementById("categoryFilter");
const searchInput = document.getElementById("searchInput");
const currentCount = document.getElementById("currentCount");
const noResults = document.getElementById("noResults");
const productModal = document.getElementById("productModal");
const modalOverlay = document.getElementById("modalOverlay");
const modalClose = document.getElementById("modalClose");
const modalMainImage = document.getElementById("modalMainImage");
const modalCategory = document.getElementById("modalCategory");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalWhatsapp = document.getElementById("modalWhatsapp");
const thumbnailStrip = document.getElementById("thumbnailStrip");

// STATE
let currentProducts = [...productsDatabase];
let currentProduct = null;

// CATEGORY NAMES
const categoryNames = {
  "living-room": "Living Room",
  bedroom: "Bedroom",
  dining: "Dining",
  office: "Office",
  kitchen: "Kitchen",
};

// INITIALIZE
function init() {
  renderProducts(currentProducts);
  setupEventListeners();
}

// RENDER PRODUCTS
function renderProducts(products) {
  productsGrid.innerHTML = "";

  if (products.length === 0) {
    noResults.style.display = "block";
    productsGrid.style.display = "none";
  } else {
    noResults.style.display = "none";
    productsGrid.style.display = "grid";

    products.forEach((product) => {
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
  const card = document.createElement("div");
  card.className = "product-item scroll-animate";
  card.onclick = () => openModal(product);

  const hasMultipleImages = product.images.length > 1;

  card.innerHTML = `
    <div class="product-image-wrapper">
      <img src="${product.images[0]}" alt="${product.name}" loading="lazy" />
      ${
        hasMultipleImages
          ? `
        <div class="images-badge">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle>
            <polyline points="21 15 16 10 5 21"></polyline>
          </svg>
          ${product.images.length} photos
        </div>
      `
          : ""
      }
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
  if (category !== "all") {
    filtered = filtered.filter((p) => p.category === category);
  }

  // Filter by search
  if (searchTerm) {
    filtered = filtered.filter(
      (p) =>
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
  thumbnailStrip.innerHTML = "";
  if (product.images.length > 1) {
    product.images.forEach((img, index) => {
      const thumb = document.createElement("div");
      thumb.className = `thumbnail ${index === 0 ? "active" : ""}`;
      thumb.innerHTML = `<img src="${img}" alt="${product.name} - View ${
        index + 1
      }" />`;
      thumb.onclick = () => selectThumbnail(img, thumb);
      thumbnailStrip.appendChild(thumb);
    });
  }

  // Setup WhatsApp
  const whatsappMessage = `Hi! I'm interested in the ${
    product.name
  } from your ${categoryNames[product.category]} collection.`;
  const whatsappNumber = "+233 50 367 6484"; // Replace with actual number
  modalWhatsapp.onclick = () => {
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        whatsappMessage
      )}`,
      "_blank"
    );
  };

  // Show modal
  productModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

// SELECT THUMBNAIL
function selectThumbnail(imageSrc, thumbElement) {
  modalMainImage.src = imageSrc;

  // Update active state
  document
    .querySelectorAll(".thumbnail")
    .forEach((t) => t.classList.remove("active"));
  thumbElement.classList.add("active");
}

// CLOSE MODAL
function closeModal() {
  productModal.classList.remove("active");
  document.body.style.overflow = "";
  currentProduct = null;
}

// LAZY LOAD IMAGES
function lazyLoadImages() {
  const images = document.querySelectorAll(".product-item img");

  images.forEach((img) => {
    if (img.complete) {
      img.classList.add("loaded");
    } else {
      img.addEventListener("load", () => {
        img.classList.add("loaded");
      });
    }
  });
}

// SETUP EVENT LISTENERS
function setupEventListeners() {
  // Filter listeners
  categoryFilter.addEventListener("change", filterProducts);
  searchInput.addEventListener("input", filterProducts);

  // Modal listeners
  modalClose.addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", closeModal);

  // Escape key to close modal
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && productModal.classList.contains("active")) {
      closeModal();
    }
  });

  // Prevent modal content click from closing
  document.querySelector(".modal-content").addEventListener("click", (e) => {
    e.stopPropagation();
  });
}

// SCROLL ANIMATIONS
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Observe scroll animations on load
window.addEventListener("load", () => {
  document.querySelectorAll(".scroll-animate").forEach((el) => {
    observer.observe(el);
  });
});

// Re-observe after filtering
const originalRenderProducts = renderProducts;
renderProducts = function (products) {
  originalRenderProducts(products);
  setTimeout(() => {
    document.querySelectorAll(".product-item").forEach((el) => {
      observer.observe(el);
    });
  }, 100);
};

// INITIALIZE APP
init();
