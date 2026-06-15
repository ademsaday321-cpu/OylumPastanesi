/* =============================================
   OYLUM PASTANESİ — App Logic
   ============================================= */

const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTba6Ya0MZ8uasBuyubcoQaFW_xOemNBldWyaryHU6lgreH8beYFfBgqzMotHhG2YZ6Eb-1KgVbCaKs/pub?output=csv";

// Placeholder images per category (Unsplash, royalty-free)
const CATEGORY_PLACEHOLDERS = [
  "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&q=70",
  "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&q=70",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=70",
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=70",
  "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=400&q=70",
  "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400&q=70",
  "https://images.unsplash.com/photo-1499195333224-3ce974eecb47?w=400&q=70",
  "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=70",
];

const PRODUCT_PLACEHOLDER =
  "https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?w=200&q=60";

// ── State ──────────────────────────────────
let allProducts = [];       // { category, name, description, price }
let categories = [];        // unique category names in order
let currentView = "home";   // "home" | "category" | "search"
let currentCategory = null;

// ── DOM refs ───────────────────────────────
const $ = (id) => document.getElementById(id);

const loadingState    = $("loadingState");
const errorState      = $("errorState");
const categoryView    = $("categoryView");
const productView     = $("productView");
const searchView      = $("searchView");
const categoryGrid    = $("categoryGrid");
const productList     = $("productList");
const searchResultList= $("searchResultList");
const productViewTitle= $("productViewTitle");
const noResults       = $("noResults");
const searchInput     = $("searchInput");
const searchClear     = $("searchClear");
const backBtn         = $("backBtn");
const productModal    = $("productModal");
const modalClose      = $("modalClose");
const modalImage      = $("modalImage");
const modalName       = $("modalName");
const modalDesc       = $("modalDesc");
const modalPrice      = $("modalPrice");

// ── CSV Parsing ────────────────────────────

function parseCSV(raw) {
  const lines = raw.trim().split(/\r?\n/);
  if (lines.length < 2) return [];

  const headers = splitCSVLine(lines[0]).map((h) => h.trim().toLowerCase()
    .replace(/ı/g, "i").replace(/ş/g, "s").replace(/ü/g, "u")
    .replace(/ö/g, "o").replace(/ç/g, "c").replace(/ğ/g, "g"));

  const idx = {
    name:     findCol(headers, ["urun adi", "urun", "name", "ad", "isim", "product", "urunadi"]),
    category: findCol(headers, ["kategorisi", "kategori", "category", "grup", "group"]),
    price:    findCol(headers, ["fiyati", "fiyat", "price", "ucret", "tutar"]),
  };

  const products = [];

  for (let i = 1; i < lines.length; i++) {
    const cols = splitCSVLine(lines[i]);
    if (!cols.length || cols.every((c) => !c.trim())) continue;

    const get = (key) => (idx[key] !== -1 && cols[idx[key]] ? cols[idx[key]].trim() : "");

    const name     = get("name");
    const category = get("category");
    const rawPrice = get("price");

    if (!category || !name) continue;

    products.push({
      category,
      name,
      description: "",
      price: formatPrice(rawPrice),
    });
  }

  return products;
}

function findCol(headers, candidates) {
  for (const c of candidates) {
    const needle = c.replace(/[\s_-]/g, "");
    const idx = headers.findIndex((h) => h.replace(/[\s_-]/g, "").includes(needle));
    if (idx !== -1) return idx;
  }
  return -1;
}

function splitCSVLine(line) {
  const result = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') { current += '"'; i++; }
      else { inQuotes = !inQuotes; }
    } else if (ch === "," && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += ch;
    }
  }
  result.push(current);
  return result;
}

function formatPrice(raw) {
  if (!raw) return "";
  // Remove non-numeric except dot/comma
  const cleaned = raw.replace(/[^\d.,]/g, "").replace(",", ".");
  const num = parseFloat(cleaned);
  if (isNaN(num)) return raw;
  return num.toLocaleString("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 2 });
}

// ── Data Loading ───────────────────────────

async function loadMenu() {
  try {
    const res = await fetch(CSV_URL);
    if (!res.ok) throw new Error("Network response was not ok");
    const text = await res.text();
    allProducts = parseCSV(text);

    // Preserve insertion order of categories
    const seen = new Set();
    allProducts.forEach((p) => {
      if (!seen.has(p.category)) { seen.add(p.category); categories.push(p.category); }
    });

    showCategoryView();
  } catch (err) {
    console.error("CSV load error:", err);
    loadingState.classList.add("hidden");
    errorState.classList.remove("hidden");
  }
}

// ── Views ──────────────────────────────────

function showCategoryView() {
  loadingState.classList.add("hidden");
  errorState.classList.add("hidden");
  productView.classList.add("hidden");
  searchView.classList.add("hidden");
  categoryView.classList.remove("hidden");
  currentView = "home";
  renderCategories();
}

function showProductView(category) {
  currentCategory = category;
  currentView = "category";
  categoryView.classList.add("hidden");
  searchView.classList.add("hidden");
  productView.classList.remove("hidden");
  productViewTitle.textContent = category;
  const items = allProducts.filter((p) => p.category === category);
  renderProductList(productList, items);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showSearchView(query) {
  currentView = "search";
  categoryView.classList.add("hidden");
  productView.classList.add("hidden");
  searchView.classList.remove("hidden");

  const q = query.trim().toLowerCase();
  const results = allProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
  );

  renderProductList(searchResultList, results);
  noResults.classList.toggle("hidden", results.length > 0);
}

// ── Renderers ──────────────────────────────

function renderCategories() {
  categoryGrid.innerHTML = "";
  categories.forEach((cat, i) => {
    const imgSrc = CATEGORY_PLACEHOLDERS[i % CATEGORY_PLACEHOLDERS.length];
    const card = document.createElement("div");
    card.className = "category-card";
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-label", cat);
    card.innerHTML = `
      <img src="${imgSrc}" alt="${escHtml(cat)}" loading="lazy" />
      <div class="category-overlay"></div>
      <span class="category-name">${escHtml(cat)}</span>
    `;
    card.addEventListener("click", () => showProductView(cat));
    card.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") showProductView(cat); });
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
    card.setAttribute("aria-label", product.name);
    card.innerHTML = `
      <img class="product-thumb" src="${PRODUCT_PLACEHOLDER}" alt="${escHtml(product.name)}" loading="lazy" />
      <div class="product-info">
        <div>
          <div class="product-name">${escHtml(product.name)}</div>
          ${product.description ? `<div class="product-desc">${escHtml(product.description)}</div>` : ""}
        </div>
        ${product.price ? `<div class="product-footer"><span class="product-price">${escHtml(product.price)}</span></div>` : ""}
      </div>
    `;
    card.addEventListener("click", () => openModal(product));
    card.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") openModal(product); });
    container.appendChild(card);
  });
}

// ── Modal ──────────────────────────────────

function openModal(product) {
  modalImage.src  = PRODUCT_PLACEHOLDER;
  modalImage.alt  = product.name;
  modalName.textContent  = product.name;
  modalDesc.textContent  = product.description || "";
  modalPrice.textContent = product.price || "";

  productModal.classList.remove("hidden");
  productModal.classList.add("entering");
  document.body.style.overflow = "hidden";

  // Remove animation class after it ends so it re-triggers next time
  productModal.addEventListener("animationend", () => productModal.classList.remove("entering"), { once: true });

  modalClose.focus();
}

function closeModal() {
  productModal.classList.add("hidden");
  document.body.style.overflow = "";
}

// ── Event Listeners ────────────────────────

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
    if (val.trim().length >= 1) {
      showSearchView(val);
    } else if (currentView === "search") {
      showCategoryView();
    }
  }, 280);
});

searchClear.addEventListener("click", () => {
  searchInput.value = "";
  searchClear.classList.remove("visible");
  searchInput.focus();
  if (currentView === "search") showCategoryView();
});

// ── Helpers ────────────────────────────────

function escHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ── Boot ───────────────────────────────────
loadMenu();
