// Product Data (local fallback)
const popularProducts = [
    { id: "1", image: "Images/pizza/Arriva.png", title: "Аррива!", description: "Пепперони, острый перец, лук, томат", price: "от 1 800 ₸", badge: "Хит" },
    { id: "2", image: "Images/pizza/Cheesy.png", title: "Сырная", description: "Четыре вида сыра, томат, орегано", price: "от 1 500 ₸", badge: "Хит" },
    { id: "3", image: "Images/pizza/Chicken Teriyaki.png", title: "Терияки", description: "Курица, соус терияки, ананас, лук", price: "от 2 100 ₸", badge: null },
    { id: "4", image: "Images/pizza/Shrimps with pesto.png", title: "Креветки со сладким чили", description: "Креветки, перец, лук, сладкий соус чили", price: "от 2 600 ₸", badge: "Новинка" }
];

const pizzas = [
    { id: "p1", image: "Images/pizza/Pesto Pizza.png", title: "Маргарита", description: "Томат, сыр моцарелла, базилик", price: "от 1 300 ₸", badge: null },
    { id: "p2", image: "Images/pizza/Ham & Cheese.png", title: "Пепперони", description: "Пепперони, сыр, томат, орегано", price: "от 1 600 ₸", badge: "Хит" },
    { id: "p3", image: "Images/pizza/Chorizo fresh.png", title: "Чоризо фреш", description: "Чоризо, перец, томат, сыр", price: "от 1 900 ₸", badge: "Новинка" },
    { id: "p4", image: "Images/pizza/Double Chicken.png", title: "Мясное наслаждение", description: "Говядина, пепперони, колбаса, бекон", price: "от 2 200 ₸", badge: null },
    { id: "p5", image: "Images/pizza/Dodo mix.png", title: "Четыре сезона", description: "Помидоры, грибы, артишоки, оливки", price: "от 1 800 ₸", badge: null },
    { id: "p6", image: "Images/pizza/Chill Grill.png", title: "Дьявольская", description: "Острая пепперони, перец халапеньо, острый соус", price: "от 1 900 ₸", badge: "Выгодно" },
    { id: "p7", image: "Images/pizza/Cheesy.png", title: "Вегетарианская", description: "Помидоры, перец, грибы, лук, оливки", price: "от 1 400 ₸", badge: null },
    { id: "p8", image: "Images/pizza/Pizza Halves.png", title: "Гавайская", description: "Ветчина, ананас, сыр, томат", price: "от 1 700 ₸", badge: null }
];

const combos = [
    { id: "c1", image: "Images/pizza/Pizza Halves.png", title: "Комбо за 3990 ₸", description: "2 пиццы + напиток + закуска", price: "3 990 ₸", badge: "Выгодно" },
    { id: "c2", image: "Images/pizza/Dodo mix.png", title: "3 пиццы", description: "На выбор + салат + соус", price: "5 990 ₸", badge: "Выгодно" },
    { id: "c3", image: "Images/pizza/Pizza Halves.png", title: "Семейный комбо", description: "4 пиццы + 2 напитка + закуска", price: "7 990 ₸", badge: null },
    { id: "c4", image: "Images/pizza/Arriva.png", title: "Экспресс обед", description: "1 пицца + напиток + десерт", price: "2 490 ₸", badge: null }
];

// Carousel functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.carousel-dot');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function showSlide(n) {
    if (!slides.length) return;
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[n].classList.add('active');
    dots[n].classList.add('active');
}

function nextSlide() {
    if (!slides.length) return;
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    if (!slides.length) return;
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

if (prevBtn) prevBtn.addEventListener('click', prevSlide);
if (nextBtn) nextBtn.addEventListener('click', nextSlide);

dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
        currentSlide = parseInt(e.target.dataset.index);
        showSlide(currentSlide);
    });
});

// Auto-advance carousel every 5 seconds
setInterval(nextSlide, 5000);

// Ensure initial slide/dot are in sync on load
if (slides && slides.length) {
    showSlide(0);
}

// Menu toggle
const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');
if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        if (navMenu) navMenu.classList.toggle('active');
    });
}

// Product rendering
function createProductCard(product) {
    // Ensure filename is URL-encoded (preserve directory slashes)
    let safeImage = product.image;
    try {
        const parts = safeImage.split('/');
        const filename = parts.pop();
        const dir = parts.join('/');
        safeImage = dir + '/' + encodeURIComponent(filename);
    } catch (e) {
        // If anything goes wrong, fall back to original path
        safeImage = product.image;
    }

    return `
        <div class="product-card">
            <div class="product-image">
                <img src="${safeImage}" alt="${product.title}" onerror="this.onerror=null;this.src='https://via.placeholder.com/400?text=No+image';">
                ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
            </div>
            <div class="product-content">
                <div class="product-info">
                    <h3 class="product-title">${product.title}</h3>
                    <p class="product-description">${product.description}</p>
                </div>
                <div class="product-footer">
                    <span class="product-price">${product.price}</span>
                    <button class="add-to-cart-btn" aria-label="Добавить в корзину" data-id="${product.id}" data-price="${product.price}">
                        <i class="fas fa-shopping-cart"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

function renderAll(popular, pizzasArr, combosArr) {
    const popularEl = document.getElementById('popularProducts');
    const pizzasEl = document.getElementById('pizzasProducts');
    const combosEl = document.getElementById('combosProducts');

    if (popularEl) popularEl.innerHTML = popular.map(createProductCard).join('');
    if (pizzasEl) pizzasEl.innerHTML = pizzasArr.map(createProductCard).join('');
    if (combosEl) combosEl.innerHTML = combosArr.map(createProductCard).join('');

    // Build products map for quick lookup
    const allProducts = [...(popular || []), ...(pizzasArr || []), ...(combosArr || [])];
    window.productsMap = {};
    allProducts.forEach(p => { if (p && p.id) window.productsMap[p.id] = p; });

    // Re-attach add-to-cart handlers -> open modal on site if available, otherwise open product page
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = btn.dataset.id;
            if (id) {
                const product = window.productsMap && window.productsMap[id];
                const modalEl = document.getElementById('productModal');
                if (modalEl && typeof openProductModal === 'function' && product) {
                    openProductModal(product);
                    // prevent default navigation
                    return;
                }

                // Fallback: open standalone product page
                window.location.href = `product.html?id=${encodeURIComponent(id)}`;
            } else {
                alert('Товар добавлен в корзину!');
            }
        });
    });
}

// ---- Product Modal Logic ----
// Elements (may be null if modal not present)
const modal = document.getElementById('productModal');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalProductImage = document.getElementById('modalProductImage');
const modalProductTitle = document.getElementById('modalProductTitle');
const modalProductDescription = document.getElementById('modalProductDescription');
const sizeOptionsEl = document.getElementById('sizeOptions');
const addonsGridEl = document.getElementById('addonsGrid');
const totalPriceEl = document.getElementById('totalPrice');
const quantityDisplay = document.getElementById('quantityDisplay');
const decreaseQtyBtn = document.getElementById('decreaseQty');
const increaseQtyBtn = document.getElementById('increaseQty');
const modalAddToCartBtn = document.getElementById('modalAddToCartBtn');

let currentProduct = null;
let currentQty = 1;
let currentSizeMult = 1;
let selectedAddons = new Set();

// Add-ons mapped to actual image files from Images/additives
const sampleAddons = [
    { id: 'a1', name: 'Моцарелла', price: 150, image: 'Images/additives/Mozzarella cheese.png' },
    { id: 'a2', name: 'Шампиньоны', price: 200, image: 'Images/additives/Mushrooms.png' },
    { id: 'a3', name: 'Ананас', price: 180, image: 'Images/additives/Pineapple.png' },
    { id: 'a4', name: 'Халапеньо', price: 120, image: 'Images/additives/jalapenos.png' },
    { id: 'a5', name: 'Чеснок', price: 80, image: 'Images/additives/garlic.png' },
    { id: 'a6', name: 'Курица', price: 220, image: 'Images/additives/Chicken.png' },
    { id: 'a7', name: 'Красный лук', price: 90, image: 'Images/additives/Red onion.png' },
    { id: 'a8', name: 'Сладкий перец', price: 110, image: 'Images/additives/Sweet pepper.png' }
];

function parsePriceString(str) {
    if (!str) return 0;
    const digits = str.replace(/[^0-9]/g, '');
    if (!digits) return 0;
    return parseInt(digits, 10);
}

function formatPrice(n) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function safeImagePath(path) {
    try {
        const parts = path.split('/');
        const filename = parts.pop();
        const dir = parts.join('/');
        return dir + '/' + encodeURIComponent(filename);
    } catch (e) {
        return path;
    }
}

function openProductModal(product, pushHistory = true) {
    if (!modal) { alert('Товар добавлен в корзину!'); return; }
    currentProduct = product;
    currentQty = 1;
    currentSizeMult = 1;
    selectedAddons = new Set();

    modalProductTitle.textContent = product.title || '';
    modalProductDescription.textContent = product.description || '';
    modalProductImage.src = safeImagePath(product.image || '');
    modalProductImage.onerror = function() { this.onerror = null; this.src = 'https://via.placeholder.com/400?text=No+image'; };

    // Sizes
    const sizes = [
        { label: '25 см', mult: 1 },
        { label: '30 см', mult: 1.2 },
        { label: '35 см', mult: 1.4 }
    ];
    if (sizeOptionsEl) {
        sizeOptionsEl.innerHTML = '';
        sizes.forEach((s, idx) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'size-btn' + (idx === 0 ? ' active' : '');
            btn.dataset.mult = s.mult;
            btn.textContent = s.label;
            btn.addEventListener('click', () => {
                currentSizeMult = parseFloat(btn.dataset.mult);
                sizeOptionsEl.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                updateTotal();
            });
            sizeOptionsEl.appendChild(btn);
        });
    }

    // Addons
    if (addonsGridEl) {
        addonsGridEl.innerHTML = '';
        sampleAddons.forEach(a => {
            const b = document.createElement('button');
            b.type = 'button';
            b.className = 'addon-btn';
            b.dataset.id = a.id;
            b.dataset.price = a.price;
            const imgSrc = a.image ? safeImagePath(a.image) : '';
            b.innerHTML = `
                <img class="addon-image" src="${imgSrc}" alt="${a.name}" onerror="this.onerror=null;this.src='https://via.placeholder.com/160?text=No+img'">
                <div class="addon-name">${a.name}</div>
                <div class="addon-price">${formatPrice(a.price)} ₸</div>
            `;
            b.addEventListener('click', () => {
                if (selectedAddons.has(a.id)) {
                    selectedAddons.delete(a.id);
                    b.classList.remove('selected');
                } else {
                    selectedAddons.add(a.id);
                    b.classList.add('selected');
                }
                updateTotal();
            });
            addonsGridEl.appendChild(b);
        });
    }

    if (quantityDisplay) quantityDisplay.textContent = String(currentQty);
    updateTotal();

    // show modal with animation
    modal.style.display = 'flex';
    // allow next frame to trigger CSS transition
    requestAnimationFrame(() => modal.classList.add('show'));
    document.body.classList.add('lock');

    // push id into URL for deep-linking
    try {
        if (pushHistory && product && product.id) {
            const url = new URL(location.href);
            url.searchParams.set('id', product.id);
            history.pushState({ productId: product.id }, '', url.pathname + url.search);
        }
    } catch (e) {
        // ignore history errors
    }
}

function updateTotal() {
    if (!currentProduct || !totalPriceEl) return;
    const base = parsePriceString(currentProduct.price);
    let addonsSum = 0;
    selectedAddons.forEach(id => {
        const a = sampleAddons.find(x => x.id === id);
        if (a) addonsSum += a.price;
    });
    const total = Math.round((base * currentSizeMult + addonsSum) * currentQty);
    totalPriceEl.textContent = formatPrice(total);
}

function closeModal(pushHistory = true) {
    if (!modal) return;
    modal.classList.remove('show');
    document.body.classList.remove('lock');
    // after transition hide completely
    setTimeout(() => {
        if (modal) modal.style.display = 'none';
    }, 260);

    // clean up URL
    try {
        if (pushHistory) {
            const url = new URL(location.href);
            url.searchParams.delete('id');
            history.pushState({}, '', url.pathname + url.search);
        }
    } catch (e) {}
}

if (modalClose) modalClose.addEventListener('click', () => closeModal(true));
if (modalOverlay) modalOverlay.addEventListener('click', () => closeModal(true));

// Handle browser back/forward to open/close modal by id
window.addEventListener('popstate', () => {
    const id = new URLSearchParams(location.search).get('id');
    if (id && window.productsMap && window.productsMap[id]) {
        openProductModal(window.productsMap[id], false);
    } else {
        closeModal(false);
    }
});
if (decreaseQtyBtn) decreaseQtyBtn.addEventListener('click', () => {
    if (currentQty > 1) currentQty--;
    if (quantityDisplay) quantityDisplay.textContent = String(currentQty);
    updateTotal();
});
if (increaseQtyBtn) increaseQtyBtn.addEventListener('click', () => {
    currentQty++;
    if (quantityDisplay) quantityDisplay.textContent = String(currentQty);
    updateTotal();
});

if (modalAddToCartBtn) modalAddToCartBtn.addEventListener('click', () => {
    // Simple localStorage cart implementation
    try {
        const cart = JSON.parse(localStorage.getItem('cart_v1') || '[]');
        const pid = currentProduct.id;
        const base = parsePriceString(currentProduct.price);
        const selectedAddonsArr = Array.from(selectedAddons);
        const item = {
            id: pid,
            title: currentProduct.title,
            qty: currentQty,
            sizeMult: currentSizeMult,
            addons: selectedAddonsArr,
            unitBasePrice: base
        };
        cart.push(item);
        localStorage.setItem('cart_v1', JSON.stringify(cart));
        modal.style.display = 'none';
        alert('Товар добавлен в корзину!');
    } catch (e) {
        console.error('Ошибка при сохранении корзины', e);
        alert('Не удалось добавить в корзину');
    }
});

// Try to load from Go API, otherwise use local data
async function init() {
    try {
        const res = await fetch('/api/products');
        if (res.ok) {
            const data = await res.json();
            renderAll(data.popular || popularProducts, data.pizzas || pizzas, data.combos || combos);
            return;
        }
    } catch (e) {
        console.warn('API fetch failed, falling back to local data', e);
    }

    // Fallback
    renderAll(popularProducts, pizzas, combos);

    // If URL contains ?id=... open modal on initial load (deep-link)
    try {
        const id = new URLSearchParams(location.search).get('id');
        if (id && window.productsMap && window.productsMap[id]) {
            openProductModal(window.productsMap[id], false);
        }
    } catch (e) {}
}

init();
