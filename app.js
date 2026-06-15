/* =============================================
   OYLUM PASTANESİ — App Logic
   ============================================= */

// CSV'den dinamik çekmek için proxy listesi — biri çalışmazsa diğeri denenir
const CSV_SHEET = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTba6Ya0MZ8uasBuyubcoQaFW_xOemNBldWyaryHU6lgreH8beYFfBgqzMotHhG2YZ6Eb-1KgVbCaKs/pub?output=csv";
const PROXIES = [
  "https://corsproxy.io/?url=",
  "https://api.allorigins.win/raw?url=",
  "https://proxy.cors.sh/",
];

// ── Kategori Görselleri ─────────────────────
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
const FALLBACK_IMG = "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=70";
const PRODUCT_IMG  = "https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?w=200&q=60";

// ── Statik Veri (CSV çekilemezse kullanılır) ─
const STATIC_DATA = [
  { category: "Sütlü & Çikolatalı Tatlılar", name: "Orman Meyveli Trileçe", price: "991 ₺" },
  { category: "Sütlü & Çikolatalı Tatlılar", name: "Karamelli Trileçe", price: "991 ₺" },
  { category: "Sütlü & Çikolatalı Tatlılar", name: "Supangle", price: "991 ₺" },
  { category: "Sütlü & Çikolatalı Tatlılar", name: "San Sebastian", price: "991 ₺" },
  { category: "Sütlü & Çikolatalı Tatlılar", name: "Profiterol", price: "991 ₺" },
  { category: "Sütlü & Çikolatalı Tatlılar", name: "Sufle", price: "991 ₺" },
  { category: "Sütlü & Çikolatalı Tatlılar", name: "Donut", price: "991 ₺" },
  { category: "Sütlü & Çikolatalı Tatlılar", name: "Fırın Sütlaç", price: "991 ₺" },
  { category: "Sütlü & Çikolatalı Tatlılar", name: "Kazan Dibi", price: "991 ₺" },
  { category: "Sütlü & Çikolatalı Tatlılar", name: "Çilekli Magnolia", price: "991 ₺" },
  { category: "Sütlü & Çikolatalı Tatlılar", name: "Lotuslu Magnolia", price: "991 ₺" },
  { category: "Sütlü & Çikolatalı Tatlılar", name: "Tiramisu", price: "991 ₺" },
  { category: "Sütlü & Çikolatalı Tatlılar", name: "Makaron", price: "991 ₺" },
  { category: "Sütlü & Çikolatalı Tatlılar", name: "Çikolatalı Yaş Pasta", price: "991 ₺" },
  { category: "Sütlü & Çikolatalı Tatlılar", name: "Meyveli Yaş Pasta", price: "991 ₺" },
  { category: "Sütlü & Çikolatalı Tatlılar", name: "Mini Ekler", price: "991 ₺" },
  { category: "Şerbetli Tatlılar", name: "Fıstıklı Baklava (Tereyağlı)", price: "991 ₺" },
  { category: "Şerbetli Tatlılar", name: "Soğuk Baklava", price: "991 ₺" },
  { category: "Şerbetli Tatlılar", name: "Bülbül Yuvası (Tereyağlı)", price: "991 ₺" },
  { category: "Şerbetli Tatlılar", name: "Cevizli Baklava (Tereyağlı)", price: "991 ₺" },
  { category: "Şerbetli Tatlılar", name: "Cevizli Sultan (Tereyağlı)", price: "991 ₺" },
  { category: "Şerbetli Tatlılar", name: "Cevizli Mekik (Tereyağlı)", price: "991 ₺" },
  { category: "Şerbetli Tatlılar", name: "Cevizli Burma Kadayıf", price: "991 ₺" },
  { category: "Şerbetli Tatlılar", name: "Şekerpare", price: "991 ₺" },
  { category: "Şerbetli Tatlılar", name: "Tulumba", price: "991 ₺" },
  { category: "Yan Aperatifler", name: "Kuru Pasta", price: "991 ₺" },
  { category: "Yan Aperatifler", name: "Elmalı Kurabiye", price: "991 ₺" },
  { category: "Yan Aperatifler", name: "İzmir Bombası", price: "991 ₺" },
  { category: "Yan Aperatifler", name: "Su Böreği", price: "991 ₺" },
  { category: "Soğuk & Sıcak İçecekler", name: "Limonata (El Yapımı)", price: "991 ₺" },
  { category: "Soğuk & Sıcak İçecekler", name: "Basil (Fesleğen Tohumlu İçecek)", price: "991 ₺" },
  { category: "Soğuk & Sıcak İçecekler", name: "Mojito", price: "991 ₺" },
  { category: "Soğuk & Sıcak İçecekler", name: "Kola", price: "991 ₺" },
  { category: "Soğuk & Sıcak İçecekler", name: "Fanta", price: "991 ₺" },
  { category: "Soğuk & Sıcak İçecekler", name: "Meyve Suyu", price: "991 ₺" },
  { category: "Soğuk & Sıcak İçecekler", name: "Fuse Tea", price: "991 ₺" },
  { category: "Soğuk & Sıcak İçecekler", name: "Bubble Tea", price: "991 ₺" },
  { category: "Soğuk & Sıcak İçecekler", name: "Gazoz", price: "991 ₺" },
  { category: "Soğuk & Sıcak İçecekler", name: "Meyveli Soda", price: "991 ₺" },
  { category: "Soğuk & Sıcak İçecekler", name: "Su", price: "991 ₺" },
  { category: "Soğuk & Sıcak İçecekler", name: "Çay", price: "991 ₺" },
  { category: "Sıcak Kahveler", name: "Türk Kahvesi", price: "991 ₺" },
  { category: "Sıcak Kahveler", name: "Nescafe", price: "991 ₺" },
  { category: "Sıcak Kahveler", name: "Latte Macchiato", price: "991 ₺" },
  { category: "Sıcak Kahveler", name: "Cappuccino", price: "991 ₺" },
  { category: "Sıcak Kahveler", name: "Americano", price: "991 ₺" },
  { category: "Sıcak Kahveler", name: "Latte", price: "991 ₺" },
  { category: "Sıcak Kahveler", name: "Cafe Au Lait", price: "991 ₺" },
  { category: "Sıcak Kahveler", name: "Flat White", price: "991 ₺" },
  { category: "Sıcak Kahveler", name: "Caffe Crema", price: "991 ₺" },
  { category: "Sıcak Kahveler", name: "Espresso", price: "991 ₺" },
  { category: "Soğuk Kahveler", name: "Latte", price: "991 ₺" },
  { category: "Soğuk Kahveler", name: "Cafe Au Lait", price: "991 ₺" },
  { category: "Soğuk Kahveler", name: "Cappuccino", price: "991 ₺" },
  { category: "Soğuk Kahveler", name: "Americano", price: "991 ₺" },
  { category: "Soğuk Kahveler", name: "Caffe Crema", price: "991 ₺" },
  { category: "Soğuk Kahveler", name: "Espresso", price: "991 ₺" },
  { category: "Soğuk Kahveler", name: "Affogato", price: "991 ₺" },
  { category: "Kiloluk Tatlılar", name: "Antep Fıstıklı Soğuk Baklava (1 kg.)", price: "991 ₺" },
  { category: "Kiloluk Tatlılar", name: "Antep Fıstıklı Soğuk Baklava (750 gr.)", price: "991 ₺" },
  { category: "Kiloluk Tatlılar", name: "Antep Fıstıklı Soğuk Baklava (500 gr.)", price: "991 ₺" },
  { category: "Kiloluk Tatlılar", name: "Tereyağlı Cevizli Baklava (1 kg.)", price: "991 ₺" },
  { category: "Kiloluk Tatlılar", name: "Tereyağlı Cevizli Baklava (500 gr.)", price: "991 ₺" },
  { category: "Kiloluk Tatlılar", name: "Tereyağlı Fıstıklı Baklava (1 kg.)", price: "991 ₺" },
  { category: "Kiloluk Tatlılar", name: "Tereyağlı Fıstıklı Baklava (500 gr.)", price: "991 ₺" },
  { category: "Kiloluk Tatlılar", name: "Tereyağlı Cevizli Kadayıf (1 kg.)", price: "991 ₺" },
  { category: "Kiloluk Tatlılar", name: "Tereyağlı Cevizli Kadayıf (500 gr.)", price: "991 ₺" },
  { category: "Kiloluk Tatlılar", name: "Tereyağlı Cevizli Sultan (1 kg.)", price: "991 ₺" },
  { category: "Kiloluk Tatlılar", name: "Tereyağlı Cevizli Sultan (500 gr.)", price: "991 ₺" },
  { category: "Kiloluk Tatlılar", name: "Şekerpare (500 gr.)", price: "991 ₺" },
  { category: "Kiloluk Tatlılar", name: "Karamelli Trileçe (1 kg.)", price: "991 ₺" },
  { category: "Kiloluk Tatlılar", name: "Karamelli Trileçe (500 gr.)", price: "991 ₺" },
  { category: "Kiloluk Tatlılar", name: "Orman Meyveli Trileçe (1 kg.)", price: "991 ₺" },
  { category: "Kiloluk Tatlılar", name: "Orman Meyveli Trileçe (500 gr.)", price: "991 ₺" },
  { category: "Kiloluk Tatlılar", name: "Mini Ekler (1 kg.)", price: "991 ₺" },
  { category: "Kiloluk Tatlılar", name: "Mini Ekler (500 gr.)", price: "991 ₺" },
  { category: "Kiloluk Tatlılar", name: "Tatlı Kuru Pasta (1 kg.)", price: "991 ₺" },
  { category: "Kiloluk Tatlılar", name: "Tatlı Kuru Pasta (500 gr.)", price: "991 ₺" },
  { category: "Kiloluk Tatlılar", name: "Tuzlu Kuru Pasta (1 kg.)", price: "991 ₺" },
  { category: "Kiloluk Tatlılar", name: "Tuzlu Kuru Pasta (500 gr.)", price: "991 ₺" },
  { category: "Kiloluk Tatlılar", name: "Tuzlu Kuru Pasta (250 gr.)", price: "991 ₺" },
  { category: "Kiloluk Tatlılar", name: "Karışık Kuru Pasta (1 kg.)", price: "991 ₺" },
  { category: "Kiloluk Tatlılar", name: "Karışık Kuru Pasta (500 gr.)", price: "991 ₺" },
  { category: "Kiloluk Tatlılar", name: "Karışık Kuru Pasta (250 gr.)", price: "991 ₺" },
  { category: "Kiloluk Tatlılar", name: "İzmir Bombası (1 kg.)", price: "991 ₺" },
  { category: "Kiloluk Tatlılar", name: "İzmir Bombası (500 gr.)", price: "991 ₺" },
  { category: "Kiloluk Tatlılar", name: "Güllaç (1 kg.)", price: "991 ₺" },
  { category: "Bütün Yaş Pastalar", name: "Meyveli Yaş Pasta (4-6 Kişilik)", price: "991 ₺" },
  { category: "Bütün Yaş Pastalar", name: "Profiterollü Yaş Pasta (4-6 Kişilik)", price: "991 ₺" },
  { category: "Bütün Yaş Pastalar", name: "Muzlu Çikolatalı Yaş Pasta (4-6 Kişilik)", price: "991 ₺" },
  { category: "Bütün Yaş Pastalar", name: "Çikolatalı Yaş Pasta (4-6 Kişilik)", price: "991 ₺" },
  { category: "Bütün Yaş Pastalar", name: "Antep Fıstıklı & Çikolatalı Yaş Pasta (4-6 Kişilik)", price: "991 ₺" },
  { category: "Bütün Yaş Pastalar", name: "Orman Meyveli Çikolatalı Yaş Pasta (4-6 Kişilik)", price: "991 ₺" },
  { category: "Bütün Yaş Pastalar", name: "Meyveli Yaş Pasta (8 Kişilik)", price: "991 ₺" },
  { category: "Bütün Yaş Pastalar", name: "Profiterollü Yaş Pasta (8 Kişilik)", price: "991 ₺" },
  { category: "Bütün Yaş Pastalar", name: "Muzlu Çikolatalı Yaş Pasta (8 Kişilik)", price: "991 ₺" },
  { category: "Bütün Yaş Pastalar", name: "Çikolatalı Yaş Pasta (8 Kişilik)", price: "991 ₺" },
  { category: "Bütün Yaş Pastalar", name: "Antep Fıstıklı & Çikolatalı Pasta (8 Kişilik)", price: "991 ₺" },
  { category: "Bütün Yaş Pastalar", name: "Orman Meyveli Çikolatalı Yaş Pasta (8 Kişilik)", price: "991 ₺" },
  { category: "Bütün Yaş Pastalar", name: "Çikolatalı Yaş Pasta (10-12 Kişilik)", price: "991 ₺" },
  { category: "Bütün Yaş Pastalar", name: "Muzlu Çikolatalı Yaş Pasta (10-12 Kişilik)", price: "991 ₺" },
];

// ── State ──────────────────────────────────
let allProducts = [];
let categories  = [];
let currentView = "home";

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

// ── CSV ────────────────────────────────────

function parseCSV(text) {
  const lines = text.trim().split(/\r?\n/);
  if (lines.length < 2) return null;
  const result = [];
  for (let i = 1; i < lines.length; i++) {
    // Virgülle böl ama tırnak içindeki virgülleri atla
    const cols = [];
    let cur = "", inQ = false;
    for (const ch of lines[i]) {
      if (ch === '"') { inQ = !inQ; }
      else if (ch === ',' && !inQ) { cols.push(cur.trim()); cur = ""; }
      else { cur += ch; }
    }
    cols.push(cur.trim());
    const name     = cols[0] || "";
    const category = cols[1] || "";
    const rawPrice = cols[2] || "";
    if (!name || !category) continue;
    const price = rawPrice.replace(/TRY/gi, "₺").trim();
    result.push({ name, category, price });
  }
  return result.length ? result : null;
}

async function tryFetchCSV() {
  // Önce proxy olmadan dene
  try {
    const r = await fetch(CSV_SHEET, { signal: AbortSignal.timeout(5000) });
    if (r.ok) {
      const data = parseCSV(await r.text());
      if (data) return data;
    }
  } catch (_) {}

  // Proxy'lerle dene
  for (const proxy of PROXIES) {
    try {
      const url = proxy + encodeURIComponent(CSV_SHEET);
      const r = await fetch(url, { signal: AbortSignal.timeout(6000) });
      if (r.ok) {
        const data = parseCSV(await r.text());
        if (data) return data;
      }
    } catch (_) {}
  }

  return null; // hepsi başarısız → statik veri
}

// ── Views ──────────────────────────────────

function initData(products) {
  allProducts = products;
  categories  = [...new Set(products.map((p) => p.category))];
  showCategoryView();
}

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
    const count  = allProducts.filter((p) => p.category === cat).length;
    const card   = document.createElement("div");
    card.className = "category-card";
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-label", cat);
    card.innerHTML = `
      <img src="${imgSrc}" alt="${escHtml(cat)}" loading="lazy" />
      <div class="category-overlay"></div>
      <span class="category-name">
        ${escHtml(cat)}
        <span class="category-count">${count} ürün</span>
      </span>
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
  modalDesc.textContent       = "";
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

// ── Events ─────────────────────────────────

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
// CSV'yi dene, 7 saniye içinde gelmezse statik veriyle başla

const csvTimeout = setTimeout(() => initData(STATIC_DATA), 7000);

tryFetchCSV().then((data) => {
  clearTimeout(csvTimeout);
  initData(data || STATIC_DATA);
});
