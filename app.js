/* =============================================
   OYLUM PASTANESİ — App Logic (Firebase)
   ============================================= */

// ── Firebase Init ──────────────────────────
const firebaseConfig = {
  apiKey: "AIzaSyCCGuwpUKpeI4IEJurujflT42xYwAylQ-o",
  authDomain: "oylumpasatanesi.firebaseapp.com",
  projectId: "oylumpasatanesi",
  storageBucket: "oylumpasatanesi.firebasestorage.app",
  messagingSenderId: "41977955233",
  appId: "1:41977955233:web:62d2682c4c01be524e01e0"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// ── Cache ──────────────────────────────────
const CACHE_KEYS = {
  cats:  "oylum_categories_v1",
  prods: "oylum_products_v1",
  ts:    "oylum_cache_ts_v1",
};
const CACHE_TTL_MS = 5 * 60 * 1000;

function isCacheValid() {
  const ts = localStorage.getItem(CACHE_KEYS.ts);
  if (!ts) return false;
  return (Date.now() - new Date(ts).getTime()) < CACHE_TTL_MS;
}

function readCache() {
  try {
    if (!isCacheValid()) return null;
    const cats  = JSON.parse(localStorage.getItem(CACHE_KEYS.cats));
    const prods = JSON.parse(localStorage.getItem(CACHE_KEYS.prods));
    if (cats && prods) return { cats, prods };
  } catch (_) {}
  return null;
}

function writeCache(cats, prods) {
  try {
    localStorage.setItem(CACHE_KEYS.cats,  JSON.stringify(cats));
    localStorage.setItem(CACHE_KEYS.prods, JSON.stringify(prods));
    localStorage.setItem(CACHE_KEYS.ts,    new Date().toISOString());
  } catch (_) {}
}

// ── Firestore Fetch ────────────────────────
async function fetchFromFirestore() {
  const [catSnap, prodSnap] = await Promise.all([
    db.collection("categories").orderBy("order").get(),
    db.collection("products").orderBy("order").get(),
  ]);
  const cats  = catSnap.docs.map(d  => ({ id: d.id,  ...d.data() }));
  const prods = prodSnap.docs.map(d => ({ id: d.id, ...d.data() }));
  return { cats, prods };
}

// ── State ──────────────────────────────────
let allProducts   = [];
let allCategories = [];
let currentView   = "home";
let currentCategoryId = null;

// ── DOM refs ───────────────────────────────
const $ = (id) => document.getElementById(id);

const loadingState      = $("loadingState");
const skeletonCategories = $("skeletonCategories");
const skeletonProducts  = $("skeletonProducts");
const categoryView      = $("categoryView");
const productView       = $("productView");
const searchView        = $("searchView");
const categoryGrid      = $("categoryGrid");
const productList       = $("productList");
const searchResultList  = $("searchResultList");
const productViewTitle  = $("productViewTitle");
const noResults         = $("noResults");
const searchInput       = $("searchInput");
const searchClear       = $("searchClear");
const backBtn           = $("backBtn");
const productModal      = $("productModal");
const modalClose        = $("modalClose");
const modalImage        = $("modalImage");
const modalCategoryTag  = $("modalCategoryTag");
const modalName         = $("modalName");
const modalDesc         = $("modalDesc");
const modalPrice        = $("modalPrice");
const errorState        = $("errorState");

// ── Skeleton helpers ───────────────────────
function showSkeletonCategories() {
  loadingState.classList.remove("hidden");
  skeletonCategories.classList.remove("hidden");
  skeletonProducts.classList.add("hidden");
}

function showSkeletonProducts() {
  loadingState.classList.remove("hidden");
  skeletonCategories.classList.add("hidden");
  skeletonProducts.classList.remove("hidden");
}

function hideSkeletons() {
  loadingState.classList.add("hidden");
}

// ── Views ──────────────────────────────────
function initData(cats, prods) {
  allCategories = cats;
  allProducts   = prods;
  showCategoryView();
}

function showCategoryView() {
  hideSkeletons();
  productView.classList.add("hidden");
  searchView.classList.add("hidden");
  categoryView.classList.remove("hidden");
  currentView = "home";
  currentCategoryId = null;
  renderCategories();
}

function showProductView(categoryId) {
  currentView = "category";
  currentCategoryId = categoryId;
  categoryView.classList.add("hidden");
  searchView.classList.add("hidden");
  productView.classList.remove("hidden");
  const cat = allCategories.find(c => c.id === categoryId);
  productViewTitle.textContent = cat ? cat.name : categoryId;
  renderProductList(productList, allProducts.filter(p => p.categoryId === categoryId));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showSearchView(query) {
  currentView = "search";
  categoryView.classList.add("hidden");
  productView.classList.add("hidden");
  searchView.classList.remove("hidden");
  const q = query.trim().toLowerCase();
  const results = allProducts.filter(p => {
    const catName = getCategoryName(p.categoryId);
    return p.name.toLowerCase().includes(q) || catName.toLowerCase().includes(q);
  });
  renderProductList(searchResultList, results);
  noResults.classList.toggle("hidden", results.length > 0);
}

// ── Helpers ────────────────────────────────
function getCategoryName(categoryId) {
  const cat = allCategories.find(c => c.id === categoryId);
  return cat ? cat.name : "";
}

function escHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ── Renderers ──────────────────────────────
function renderCategories() {
  categoryGrid.innerHTML = "";
  allCategories.forEach((cat) => {
    const count = allProducts.filter(p => p.categoryId === cat.id).length;
    const card  = document.createElement("div");
    card.className = "category-card";
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-label", cat.name);
    card.innerHTML = `
      <img src="${escHtml(cat.imageUrl || '')}" alt="${escHtml(cat.name)}" loading="lazy" />
      <div class="category-overlay"></div>
      <span class="category-name">
        ${escHtml(cat.name)}
        <span class="category-count">${count} ürün</span>
      </span>
    `;
    card.addEventListener("click", () => showProductView(cat.id));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") showProductView(cat.id);
    });
    categoryGrid.appendChild(card);
  });
}

function renderProductList(container, items) {
  container.innerHTML = "";
  items.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");

    const thumbHtml = product.imageUrl
      ? `<img class="product-thumb" src="${escHtml(product.imageUrl)}" alt="${escHtml(product.name)}" loading="lazy" />`
      : `<div class="product-thumb product-thumb-placeholder">🧁</div>`;

    card.innerHTML = `
      ${thumbHtml}
      <div class="product-info">
        <div class="product-name">${escHtml(product.name)}</div>
        ${product.description ? `<div class="product-desc-preview">${escHtml(product.description)}</div>` : ""}
        ${product.price ? `<div class="product-footer"><span class="product-price">${escHtml(product.price)}</span></div>` : ""}
      </div>
    `;
    card.addEventListener("click", () => openModal(product));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") openModal(product);
    });
    container.appendChild(card);
  });
}

// ── Modal ──────────────────────────────────
function openModal(product) {
  const cat = allCategories.find(c => c.id === product.categoryId);
  modalImage.src              = product.imageUrl || (cat && cat.imageUrl) || "";
  modalImage.alt              = product.name;
  modalCategoryTag.textContent = cat ? cat.name : "";
  modalName.textContent       = product.name;
  modalDesc.textContent       = product.description || "";
  modalPrice.textContent      = product.price || "";
  productModal.classList.remove("hidden");
  productModal.classList.add("entering");
  document.body.style.overflow = "hidden";
  productModal.addEventListener(
    "animationend",
    () => productModal.classList.remove("entering"),
    { once: true }
  );
  modalClose.focus();
}

function closeModal() {
  productModal.classList.add("hidden");
  document.body.style.overflow = "";
}

// ── Events ─────────────────────────────────
backBtn.addEventListener("click", showCategoryView);
modalClose.addEventListener("click", closeModal);
productModal.addEventListener("click", (e) => {
  if (e.target === productModal) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !productModal.classList.contains("hidden")) closeModal();
});

let searchTimer;
searchInput.addEventListener("input", () => {
  const val = searchInput.value;
  searchClear.classList.toggle("visible", val.length > 0);
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    if (val.trim().length >= 1) showSearchView(val);
    else if (currentView === "search") showCategoryView();
  }, 280);
});

searchClear.addEventListener("click", () => {
  searchInput.value = "";
  searchClear.classList.remove("visible");
  searchInput.focus();
  if (currentView === "search") showCategoryView();
});

// ── Boot ───────────────────────────────────
(async function boot() {
  const cached = readCache();
  if (cached) {
    initData(cached.cats, cached.prods);
    return;
  }

  showSkeletonCategories();

  try {
    const { cats, prods } = await fetchFromFirestore();
    writeCache(cats, prods);
    initData(cats, prods);
  } catch (err) {
    hideSkeletons();
    errorState.classList.remove("hidden");
    console.error("Firestore yükleme hatası:", err);
  }
})();
