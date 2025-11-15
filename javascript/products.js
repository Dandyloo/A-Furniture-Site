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
    id: 101,
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
    id: 102,
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
    id: 103,
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
    id: 104,
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
    id: 105,
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
    id: 106,
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
    id: 107,
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
    id: 108,
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
    id: 109,
    name: "LR-009",
    category: "living-room",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760870260/living-set-6a_tentud.webp",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760870262/living-set-6b_yuf9eg.webp",
    ],
    description: "We'll place a description here",
  },
  {
    id: 110,
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
    id: 111,
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
    id: 112,
    name: "LR-012",
    category: "living-room",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760870281/living-set-9a_pf4dtd.webp",
    ],
    description: "We'll place a description here",
  },
  {
    id: 113,
    name: "LR-013",
    category: "living-room",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1762190077/10_saaihd.png",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1762190082/HE9A1677_hcdnyt.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1762190073/HE9A1675_eynaub.jpg"
    ],
    description: "We'll place a description here",
  },
  {
    id: 114,
    name: "LR-014",
    category: "living-room",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1762190512/17_scmq5d.png",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1762190514/HE9A1812_aq1xwp.jpg",
    ],
    description: "We'll place a description here",
  },
  {
    id: 115,
    name: "LR-015",
    category: "living-room",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1762190641/25_niprrx.png",
    ],
    description: "We'll place a description here",
  },
  {
    id: 116,
    name: "LR-016",
    category: "living-room",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1762190635/26_o9kqqg.png",
    ],
    description: "We'll place a description here",
  },
  {
    id: 117,
    name: "LR-017",
    category: "living-room",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1762190632/28_h8jizj.png",
    ],
    description: "We'll place a description here",
  },
  {
    id: 118,
    name: "LR-018",
    category: "living-room",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1762190627/29_wrnxtm.png",
    ],
    description: "We'll place a description here",
  },
  {
    id: 119,
    name: "LR-019",
    category: "living-room",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1762190622/24_hq1h1j.png",
    ],
    description: "We'll place a description here",
  },
  {
    id: 120,
    name: "LR-020",
    category: "living-room",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1762190871/20_shh5bn.png",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1762190872/19_vbilzb.png"
    ],
    description: "We'll place a description here",
  },
  {
    id: 121,
    name: "LR-021",
    category: "living-room",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1762369334/5771497007519305141_120_kxc2uq.jpg",
    ],
    description: "We'll place a description here",
  },
  {
    id: 122,
    name: "LR-022",
    category: "living-room",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1762369328/5771497007519305125_120_t4bxja.jpg",
    ],
    description: "We'll place a description here",
  },
  {
    id: 123,
    name: "LR-023",
    category: "living-room",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1762369328/5771497007519305140_120_ti1sia.jpg",
    ],
    description: "We'll place a description here",
  },
  {
    id: 124,
    name: "LR-024",
    category: "living-room",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1762369328/5771497007519305134_120_h3svic.jpg",
    ],
    description: "We'll place a description here",
  },
  {
    id: 125,
    name: "LR-025",
    category: "living-room",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1762369327/5771497007519305142_120_k237dx.jpg",
    ],
    description: "We'll place a description here",
  },
  {
    id: 126,
    name: "LR-026",
    category: "living-room",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1762369322/5771497007519305139_120_scnyoz.jpg",
    ],
    description: "We'll place a description here",
  },
  {
    id: 127,
    name: "LR-027",
    category: "living-room",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1762369322/5771497007519305138_120_rbm7rn.jpg",
    ],
    description: "We'll place a description here",
  },
  {
    id: 128,
    name: "LR-028",
    category: "living-room",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1762369321/5771497007519305137_120_qaiwq9.jpg",
    ],
    description: "We'll place a description here",
  },
  {
    id: 129,
    name: "LR-029",
    category: "living-room",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1762369313/5771497007519305136_120_c8ijq1.jpg",
    ],
    description: "We'll place a description here",
  },
  {
    id: 130,
    name: "LR-030",
    category: "living-room",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1762369312/5771497007519305135_120_dlvovt.jpg",
    ],
    description: "We'll place a description here",
  },
  {
    id: 131,
    name: "LR-031",
    category: "living-room",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1762369312/5771497007519305132_120_lqmpgh.jpg",
    ],
    description: "We'll place a description here",
  },
  {
    id: 132,
    name: "LR-032",
    category: "living-room",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1762369310/5771497007519305127_120_ppbddi.jpg",
    ],
    description: "We'll place a description here",
  },
  {
    id: 133,
    name: "LR-033",
    category: "living-room",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1762369310/5771497007519305126_120_kqtvu3.jpg",
    ],
    description: "We'll place a description here",
  },
  {
    id: 134,
    name: "LR-034",
    category: "living-room",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1762369311/5771497007519305133_120_uoyuwp.jpg",
    ],
    description: "We'll place a description here",
  },
  {
    id: 135,
    name: "LR-035",
    category: "living-room",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1762369309/5771497007519305143_120_x4aydz.jpg",
    ],
    description: "We'll place a description here",
  },
  {
    id: 136,
    name: "LR-036",
    category: "living-room",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1762369284/5771497007519305124_120_qcbsot.jpg",
    ],
    description: "We'll place a description here",
  },
  {
    id: 137,
    name: "LR-037",
    category: "living-room",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1762191433/23_c6tq9x.png",
    ],
    description:
      "",
  },
  {
    id: 138,
    name: "LR-038",
    category: "living-room",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1762191428/21_jxke1w.png",
    ],
    description:
      "",
  },

 // BEDROOM PRODUCTS
  {
    id: 201,
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
    id: 202,
    name: "BR-002",
    category: "bedroom",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760870320/bedroom-12_vq6ou0.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760870322/bedroom-13_jhrxid.jpg",
    ],
    description: "We'll place a description here",
  },
  {
    id: 203,
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
    id: 204,
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
  {
    id: 205,
    name: "BR-005",
    category: "bedroom",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1762191592/18_n1iwfx.png",
    ],
    description: "We'll place a description here",
  },
  {
    id: 206,
    name: "BR-006",
    category: "bedroom",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1763233555/31_g8o4ke.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1763233555/30_m6cs0j.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1763233555/33_pv4oyv.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1763233555/32_iusaa1.jpg"
    ],
    description: "We'll place a description here",
  },
  {
    id: 207,
    name: "BR-007",
    category: "bedroom",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1763233755/34_dzv06k.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1763233755/35_rmalh5.jpg"
    ],
    description: "We'll place a description here",
  },
  {
    id: 208,
    name: "BR-008",
    category: "bedroom",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1763233995/36_mzwlbk.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1763233997/37_cf8oek.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1763233997/38_mvbgqz.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1763233996/39_d3tau4.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1763233995/40_v3awen.jpg"
    ],
    description: "We'll place a description here",
  },
  {
    id: 209,
    name: "BR-009",
    category: "bedroom",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1763234243/41_gwejuj.png",
    ],
    description: "We'll place a description here",
  },
  {
    id: 210,
    name: "BR-010",
    category: "bedroom",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1763234470/42_zp3b0l.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1763234468/43_pk2abe.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1763234467/44_ygz5bf.jpg"
    ],
    description: "We'll place a description here",
  },
  {
    id: 211,
    name: "BR-011",
    category: "bedroom",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1763234992/47_j2nm8y.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1763234750/45_xk6egn.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1763234751/46_gogpbh.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1763234749/48_bsoaig.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1763234748/49_ztcpto.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1763234763/50_ffl839.jpg"
    ],
    description: "We'll place a description here",
  },
  {
    id: 212,
    name: "BR-012",
    category: "bedroom",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1763235003/51_giwjxs.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1763234997/52_j3ltdr.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1763234995/53_lg4hb4.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1763234995/54_pzmard.jpg"
    ],
    description: "We'll place a description here",
  },








  // KITCHEN PRODUCTS
  {
    id: 301,
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
    id: 302,
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
    id: 303,
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
    id: 304,
    name: "KS-004",
    category: "kitchen",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760868397/kitchen-set-13a_oisbcd.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760868399/kitchen-set-13b_ia2e6z.jpg",
    ],
    description: "We'll place a description here",
  },
  {
    id: 305,
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
    id: 306,
    name: "KS-006",
    category: "kitchen",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760868437/kitchen-set-15a_rgvjyg.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760868439/kitchen-set-15b_sjh3wr.jpg",
    ],
    description: "We'll place a description here",
  },
  {
    id: 307,
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
    id: 308,
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
    id: 309,
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
    id: 310,
    name: "KS-010",
    category: "kitchen",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760868843/kitchen-set-3a_pxgwh2.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760868878/kitchen-set-3b_ujv14f.jpg",
    ],
    description: "We'll place a description here",
  },
  {
    id: 311,
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
    id: 312,
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
    id: 313,
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
    id: 314,
    name: "KS-014",
    category: "kitchen",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760869181/kitchen-set-7a_hfhaqk.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760869342/kitchen-set-7b_bgkpgt.jpg",
    ],
    description: "We'll place a description here",
  },
  {
    id: 315,
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
    id: 316,
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
    id: 401,
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
    id: 501,
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
    id: 502,
    name: "OS-002",
    category: "office",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760868275/office-set-2b_y8sjqv.webp",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760868273/office-set-2a_r1g3gq.jpg",
    ],
    description:
      "",
  },
  {
    id: 503,
    name: "OS-003",
    category: "office",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760868278/office-set-3a_efth2r.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1760868280/office-set-3b_nsqwzj.jpg",
    ],
    description:
      "",
  },
  {
    id: 504,
    name: "OS-004",
    category: "office",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1762104902/5_y0on9v.png",
    ],
    description:
      "",
  },
  {
    id: 505,
    name: "OS-005",
    category: "office",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1762104902/7_eyazoj.png",
    ],
    description:
      "",
  },
  {
    id: 506,
    name: "OS-006",
    category: "office",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1762104901/9_yaeo8q.png",
    ],
    description:
      "",
  },
  {
    id: 507,
    name: "OS-007",
    category: "office",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1762104900/8_bei6k2.png",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1762189981/HE9A1714_sw6jlb.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1762189957/HE9A1712_xraxsb.jpg",
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1762189955/HE9A1713_qicnaq.jpg"
    ],
    description:
      "",
  },
  {
    id: 508,
    name: "OS-008",
    category: "office",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1762104896/2_kyzwiv.png",
    ],
    description:
      "",
  },
  {
    id: 509,
    name: "OS-009",
    category: "office",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1762104895/4_znfph7.png",
    ],
    description:
      "",
  },
  {
    id: 510,
    name: "OS-010",
    category: "office",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1762104893/3_lkyats.png",
    ],
    description:
      "",
  },
  {
    id: 511,
    name: "OS-011",
    category: "office",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1762191423/22_xigfaz.png",
    ],
    description:
      "",
  },

  // OUTDOOR PRODUCTS
  {
    id: 601,
    name: "OT-001",
    category: "outdoor",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1762105003/1_hxryim.png",
    ],
    description: "We'll place a description here.",
  },
  {
    id: 602,
    name: "OT-002",
    category: "outdoor",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1762106260/3_nvpy3q.jpg",
    ],
    description: "We'll place a description here.",
  },
  {
    id: 603,
    name: "OT-003",
    category: "outdoor",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1762106258/2_u5vezj.jpg",
    ],
    description: "We'll place a description here.",
  },
  {
    id: 604,
    name: "OT-004",
    category: "outdoor",
    images: [
      "https://res.cloudinary.com/djmyiuu5k/image/upload/v1762106258/1_somocj.jpg",
    ],
    description: "We'll place a description here.",
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
  outdoor: "Outdoor",
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
