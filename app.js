/* =============================================
   OYLUM PASTANESİ — App Logic
   ============================================= */

// ── Statik Menü Verisi ─────────────────────
const MENU_DATA = [
  // Sütlü & Çikolatalı Tatlılar
  { category: "Sütlü & Çikolatalı Tatlılar", name: "Orman Meyveli Trileçe", price: "" },
  { category: "Sütlü & Çikolatalı Tatlılar", name: "Karamelli Trileçe", price: "" },
  { category: "Sütlü & Çikolatalı Tatlılar", name: "Supangle", price: "" },
  { category: "Sütlü & Çikolatalı Tatlılar", name: "San Sebastian", price: "" },
  { category: "Sütlü & Çikolatalı Tatlılar", name: "Profiterol", price: "" },
  { category: "Sütlü & Çikolatalı Tatlılar", name: "Sufle", price: "" },
  { category: "Sütlü & Çikolatalı Tatlılar", name: "Donut", price: "" },
  { category: "Sütlü & Çikolatalı Tatlılar", name: "Fırın Sütlaç", price: "" },
  { category: "Sütlü & Çikolatalı Tatlılar", name: "Kazan Dibi", price: "" },
  { category: "Sütlü & Çikolatalı Tatlılar", name: "Çilekli Magnolia", price: "" },
  { category: "Sütlü & Çikolatalı Tatlılar", name: "Lotuslu Magnolia", price: "" },
  { category: "Sütlü & Çikolatalı Tatlılar", name: "Tiramisu", price: "" },
  { category: "Sütlü & Çikolatalı Tatlılar", name: "Makaron", price: "" },
  { category: "Sütlü & Çikolatalı Tatlılar", name: "Çikolatalı Yaş Pasta", price: "" },
  { category: "Sütlü & Çikolatalı Tatlılar", name: "Meyveli Yaş Pasta", price: "" },
  { category: "Sütlü & Çikolatalı Tatlılar", name: "Mini Ekler", price: "" },
  // Şerbetli Tatlılar
  { category: "Şerbetli Tatlılar", name: "Fıstıklı Baklava (Tereyağlı)", price: "" },
  { category: "Şerbetli Tatlılar", name: "Soğuk Baklava", price: "" },
  { category: "Şerbetli Tatlılar", name: "Bülbül Yuvası (Tereyağlı)", price: "" },
  { category: "Şerbetli Tatlılar", name: "Cevizli Baklava (Tereyağlı)", price: "" },
  { category: "Şerbetli Tatlılar", name: "Cevizli Sultan (Tereyağlı)", price: "" },
  { category: "Şerbetli Tatlılar", name: "Cevizli Mekik (Tereyağlı)", price: "" },
  { category: "Şerbetli Tatlılar", name: "Cevizli Burma Kadayıf", price: "" },
  { category: "Şerbetli Tatlılar", name: "Şekerpare", price: "" },
  { category: "Şerbetli Tatlılar", name: "Tulumba", price: "" },
  // Yan Aperatifler
  { category: "Yan Aperatifler", name: "Kuru Pasta", price: "" },
  { category: "Yan Aperatifler", name: "Elmalı Kurabiye", price: "" },
  { category: "Yan Aperatifler", name: "İzmir Bombası", price: "" },
  { category: "Yan Aperatifler", name: "Su Böreği", price: "" },
  // Soğuk & Sıcak İçecekler
  { category: "Soğuk & Sıcak İçecekler", name: "Limonata (El Yapımı)", price: "" },
  { category: "Soğuk & Sıcak İçecekler", name: "Basil (Fesleğen Tohumlu İçecek)", price: "" },
  { category: "Soğuk & Sıcak İçecekler", name: "Mojito", price: "" },
  { category: "Soğuk & Sıcak İçecekler", name: "Kola", price: "" },
  { category: "Soğuk & Sıcak İçecekler", name: "Fanta", price: "" },
  { category: "Soğuk & Sıcak İçecekler", name: "Meyve Suyu", price: "" },
  { category: "Soğuk & Sıcak İçecekler", name: "Fuse Tea", price: "" },
  { category: "Soğuk & Sıcak İçecekler", name: "Bubble Tea", price: "" },
  { category: "Soğuk & Sıcak İçecekler", name: "Gazoz", price: "" },
  { category: "Soğuk & Sıcak İçecekler", name: "Meyveli Soda", price: "" },
  { category: "Soğuk & Sıcak İçecekler", name: "Su", price: "" },
  { category: "Soğuk & Sıcak İçecekler", name: "Çay", price: "" },
  // Sıcak Kahveler
  { category: "Sıcak Kahveler", name: "Türk Kahvesi", price: "" },
  { category: "Sıcak Kahveler", name: "Nescafe", price: "" },
  { category: "Sıcak Kahveler", name: "Latte Macchiato", price: "" },
  { category: "Sıcak Kahveler", name: "Cappuccino", price: "" },
  { category: "Sıcak Kahveler", name: "Americano", price: "" },
  { category: "Sıcak Kahveler", name: "Latte", price: "" },
  { category: "Sıcak Kahveler", name: "Cafe Au Lait", price: "" },
  { category: "Sıcak Kahveler", name: "Flat White", price: "" },
  { category: "Sıcak Kahveler", name: "Caffe Crema", price: "" },
  { category: "Sıcak Kahveler", name: "Espresso", price: "" },
  // Soğuk Kahveler
  { category: "Soğuk Kahveler", name: "Latte", price: "" },
  { category: "Soğuk Kahveler", name: "Cafe Au Lait", price: "" },
  { category: "Soğuk Kahveler", name: "Cappuccino", price: "" },
  { category: "Soğuk Kahveler", name: "Americano", price: "" },
  { category: "Soğuk Kahveler", name: "Caffe Crema", price: "" },
  { category: "Soğuk Kahveler", name: "Espresso", price: "" },
  { category: "Soğuk Kahveler", name: "Affogato", price: "" },
  // Kiloluk Tatlılar
  { category: "Kiloluk Tatlılar", name: "Antep Fıstıklı Soğuk Baklava (1 kg.)", price: "" },
  { category: "Kiloluk Tatlılar", name: "Antep Fıstıklı Soğuk Baklava (750 gr.)", price: "" },
  { category: "Kiloluk Tatlılar", name: "Antep Fıstıklı Soğuk Baklava (500 gr.)", price: "" },
  { category: "Kiloluk Tatlılar", name: "Tereyağlı Cevizli Baklava (1 kg.)", price: "" },
  { category: "Kiloluk Tatlılar", name: "Tereyağlı Cevizli Baklava (500 gr.)", price: "" },
  { category: "Kiloluk Tatlılar", name: "Tereyağlı Fıstıklı Baklava (1 kg.)", price: "" },
  { category: "Kiloluk Tatlılar", name: "Tereyağlı Fıstıklı Baklava (500 gr.)", price: "" },
  { category: "Kiloluk Tatlılar", name: "Tereyağlı Cevizli Kadayıf (1 kg.)", price: "" },
  { category: "Kiloluk Tatlılar", name: "Tereyağlı Cevizli Kadayıf (500 gr.)", price: "" },
  { category: "Kiloluk Tatlılar", name: "Tereyağlı Cevizli Sultan (1 kg.)", price: "" },
  { category: "Kiloluk Tatlılar", name: "Tereyağlı Cevizli Sultan (500 gr.)", price: "" },
  { category: "Kiloluk Tatlılar", name: "Şekerpare (500 gr.)", price: "" },
  { category: "Kiloluk Tatlılar", name: "Karamelli Trileçe (1 kg.)", price: "" },
  { category: "Kiloluk Tatlılar", name: "Karamelli Trileçe (500 gr.)", price: "" },
  { category: "Kiloluk Tatlılar", name: "Orman Meyveli Trileçe (1 kg.)", price: "" },
  { category: "Kiloluk Tatlılar", name: "Orman Meyveli Trileçe (500 gr.)", price: "" },
  { category: "Kiloluk Tatlılar", name: "Mini Ekler (1 kg.)", price: "" },
  { category: "Kiloluk Tatlılar", name: "Mini Ekler (500 gr.)", price: "" },
  { category: "Kiloluk Tatlılar", name: "Tatlı Kuru Pasta (1 kg.)", price: "" },
  { category: "Kiloluk Tatlılar", name: "Tatlı Kuru Pasta (500 gr.)", price: "" },
  { category: "Kiloluk Tatlılar", name: "Tuzlu Kuru Pasta (1 kg.)", price: "" },
  { category: "Kiloluk Tatlılar", name: "Tuzlu Kuru Pasta (500 gr.)", price: "" },
  { category: "Kiloluk Tatlılar", name: "Tuzlu Kuru Pasta (250 gr.)", price: "" },
  { category: "Kiloluk Tatlılar", name: "Karışık Kuru Pasta (1 kg.)", price: "" },
  { category: "Kiloluk Tatlılar", name: "Karışık Kuru Pasta (500 gr.)", price: "" },
  { category: "Kiloluk Tatlılar", name: "Karışık Kuru Pasta (250 gr.)", price: "" },
  { category: "Kiloluk Tatlılar", name: "İzmir Bombası (1 kg.)", price: "" },
  { category: "Kiloluk Tatlılar", name: "İzmir Bombası (500 gr.)", price: "" },
  { category: "Kiloluk Tatlılar", name: "Güllaç (1 kg.)", price: "" },
  // Bütün Yaş Pastalar
  { category: "Bütün Yaş Pastalar", name: "Meyveli Yaş Pasta (4-6 Kişilik)", price: "" },
  { category: "Bütün Yaş Pastalar", name: "Profiterollü Yaş Pasta (4-6 Kişilik)", price: "" },
  { category: "Bütün Yaş Pastalar", name: "Muzlu Çikolatalı Yaş Pasta (4-6 Kişilik)", price: "" },
  { category: "Bütün Yaş Pastalar", name: "Çikolatalı Yaş Pasta (4-6 Kişilik)", price: "" },
  { category: "Bütün Yaş Pastalar", name: "Antep Fıstıklı & Çikolatalı Yaş Pasta (4-6 Kişilik)", price: "" },
  { category: "Bütün Yaş Pastalar", name: "Orman Meyveli Çikolatalı Yaş Pasta (4-6 Kişilik)", price: "" },
  { category: "Bütün Yaş Pastalar", name: "Meyveli Yaş Pasta (8 Kişilik)", price: "" },
  { category: "Bütün Yaş Pastalar", name: "Profiterollü Yaş Pasta (8 Kişilik)", price: "" },
  { category: "Bütün Yaş Pastalar", name: "Muzlu Çikolatalı Yaş Pasta (8 Kişilik)", price: "" },
  { category: "Bütün Yaş Pastalar", name: "Çikolatalı Yaş Pasta (8 Kişilik)", price: "" },
  { category: "Bütün Yaş Pastalar", name: "Antep Fıstıklı & Çikolatalı Pasta (8 Kişilik)", price: "" },
  { category: "Bütün Yaş Pastalar", name: "Orman Meyveli Çikolatalı Yaş Pasta (8 Kişilik)", price: "" },
  { category: "Bütün Yaş Pastalar", name: "Çikolatalı Yaş Pasta (10-12 Kişilik)", price: "" },
  { category: "Bütün Yaş Pastalar", name: "Muzlu Çikolatalı Yaş Pasta (10-12 Kişilik)", price: "" },
];

// ── Kategori görselleri (Unsplash placeholder) ─
const CATEGORY_IMAGES = {
  "Sütlü & Çikolatalı Tatlılar": "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&q=70",
  "Şerbetli Tatlılar":           "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=400&q=70",
  "Yan Aperatifler":             "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&q=70",
  "Soğuk & Sıcak İçecekler":    "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&q=70",
  "Sıcak Kahveler":              "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&q=70",
  "Soğuk Kahveler":              "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=70",
  "Kiloluk Tatlılar":            "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=400&q=70",
  "Bütün Yaş Pastalar":          "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&q=70",
};

const FALLBACK_IMG   = "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=70";
const PRODUCT_IMG    = "https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?w=200&q=60";

// ── State ──────────────────────────────────
const allProducts = MENU_DATA;
const categories  = [...new Set(MENU_DATA.map((p) => p.category))];
let currentView   = "home";

// ── DOM refs ───────────────────────────────
const $ = (id) => document.getElementById(id);

const loadingState     = $("loadingState");
const categoryView     = $("categoryView");
const productView      = $("productView");
const searchView       = $("searchView");
const categoryGrid     = $("categoryGrid");
const productList      = $("productList");
const searchResultList = $("searchResultList");
const productViewTitle = $("productViewTitle");
const noResults        = $("noResults");
const searchInput      = $("searchInput");
const searchClear      = $("searchClear");
const backBtn          = $("backBtn");
const productModal     = $("productModal");
const modalClose       = $("modalClose");
const modalImage       = $("modalImage");
const modalCategoryTag = $("modalCategoryTag");
const modalName        = $("modalName");
const modalDesc        = $("modalDesc");
const modalPrice       = $("modalPrice");

// ── Views ──────────────────────────────────

function showCategoryView() {
  loadingState.classList.add("hidden");
  productView.classList.add("hidden");
  searchView.classList.add("hidden");
  categoryView.classList.remove("hidden");
  currentView = "home";
  renderCategories();
}

function showProductView(category) {
  currentView = "category";
  categoryView.classList.add("hidden");
  searchView.classList.add("hidden");
  productView.classList.remove("hidden");
  productViewTitle.textContent = category;
  renderProductList(productList, allProducts.filter((p) => p.category === category));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showSearchView(query) {
  currentView = "search";
  categoryView.classList.add("hidden");
  productView.classList.add("hidden");
  searchView.classList.remove("hidden");

  const q = query.trim().toLowerCase();
  const results = allProducts.filter(
    (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
  );

  renderProductList(searchResultList, results);
  noResults.classList.toggle("hidden", results.length > 0);
}

// ── Renderers ──────────────────────────────

function renderCategories() {
  categoryGrid.innerHTML = "";
  categories.forEach((cat) => {
    const imgSrc = CATEGORY_IMAGES[cat] || FALLBACK_IMG;
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
      <img class="product-thumb" src="${PRODUCT_IMG}" alt="${escHtml(product.name)}" loading="lazy" />
      <div class="product-info">
        <div class="product-name">${escHtml(product.name)}</div>
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
  modalImage.src              = CATEGORY_IMAGES[product.category] || PRODUCT_IMG;
  modalImage.alt              = product.name;
  modalCategoryTag.textContent = product.category;
  modalName.textContent       = product.name;
  modalDesc.textContent       = product.description || "";
  modalPrice.textContent      = product.price || "";

  productModal.classList.remove("hidden");
  productModal.classList.add("entering");
  document.body.style.overflow = "hidden";
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
productModal.addEventListener("click", (e) => { if (e.target === productModal) closeModal(); });
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

// ── Helpers ────────────────────────────────

function escHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ── Boot ───────────────────────────────────
showCategoryView();
