// Product Data (local fallback)
const popularProducts = [
    { id: "1", image: "/static/images/pizza/Arriva.png", title: "Аррива!", description: "Пепперони, острый перец, лук, томат", price: "от 1 800 ₸", badge: "Хит" },
    { id: "2", image: "/static/images/pizza/Cheesy.png", title: "Сырная", description: "Четыре вида сыра, томат, орегано", price: "от 1 500 ₸", badge: "Хит" },
    { id: "3", image: "/static/images/pizza/Chicken-Teriyaki.png", title: "Терияки", description: "Курица, соус терияки, ананас, лук", price: "от 2 100 ₸", badge: null },
    { id: "4", image: "/static/images/pizza/Shrimps-with-pesto.png", title: "Креветки со сладким чили", description: "Креветки, перец, лук, сладкий соус чили", price: "от 2 600 ₸", badge: "Новинка" }
];

const pizzas = [
    { id: "p1", image: "/static/images/pizza/Pesto-Pizza.png", title: "Маргарита", description: "Томат, сыр моцарелла, базилик", price: "от 1 300 ₸", badge: null },
    { id: "p2", image: "/static/images/pizza/Ham-and-Cheese.png", title: "Пепперони", description: "Пепперони, сыр, томат, орегано", price: "от 1 600 ₸", badge: "Хит" },
    { id: "p3", image: "/static/images/pizza/Chorizo-fresh.png", title: "Чоризо фреш", description: "Чоризо, перец, томат, сыр", price: "от 1 900 ₸", badge: "Новинка" },
    { id: "p4", image: "/static/images/pizza/Double-Chicken.png", title: "Мясное наслаждение", description: "Говядина, пепперони, колбаса, бекон", price: "от 2 200 ₸", badge: null },
    { id: "p5", image: "/static/images/pizza/Dodo-mix.png", title: "Четыре сезона", description: "Помидоры, грибы, артишоки, оливки", price: "от 1 800 ₸", badge: null },
    { id: "p6", image: "/static/images/pizza/Chill-Grill.png", title: "Дьявольская", description: "Острая пепперони, перец халапеньо, острый соус", price: "от 1 900 ₸", badge: "Выгодно" },
    { id: "p7", image: "/static/images/pizza/Cheesy.png", title: "Вегетарианская", description: "Помидоры, перец, грибы, лук, оливки", price: "от 1 400 ₸", badge: null },
    { id: "p8", image: "/static/images/pizza/Pizza-Halves.png", title: "Гавайская", description: "Ветчина, ананас, сыр, томат", price: "от 1 700 ₸", badge: null },
    { id: "p9", image: "/static/images/pizza/Chicken-Teriyaki.png", title: "Терияки", description: "Курица, соус терияки, ананас, лук", price: "от 2 100 ₸", badge: null },
    { id: "p10", image: "/static/images/pizza/Shrimps-with-pesto.png", title: "Креветки со сладким чили", description: "Креветки, перец, лук, сладкий соус чили", price: "от 2 600 ₸", badge: "Новинка" },
    { id: "p11", image: "/static/images/pizza/Arriva.png", title: "Аррива!", description: "Пепперони, острый перец, лук, томат", price: "от 1 800 ₸", badge: "Хит" },
    { id: "p12", image: "/static/images/pizza/Chicken-Ranch.png", title: "Чикен Ранч", description: "Курица, бекон, сыр, чеснок, соус ранч", price: "от 2 000 ₸", badge: null },
    { id: "p13", image: "/static/images/pizza/Meat-Feast.png", title: "Мясное наслаждение", description: "Говядина, пепперони, колбаса, бекон", price: "от 2 300 ₸", badge: "Выгодно" },
    { id: "p14", image: "/static/images/pizza/Four-Seasons.png", title: "Четыре сезона", description: "Помидоры, грибы, артишоки, оливки", price: "от 1 900 ₸", badge: null },
    { id: "p15", image: "/static/images/pizza/Create-your-own-pizza.png", title: "Создай свою пиццу", description: "Выбери ингредиенты на свой вкус", price: "от 1 200 ₸", badge: "Популярно" },
    { id: "p16", image: "/static/images/pizza/Burger-pizza.png", title: "Бургер Пицца", description: "Мясная булка с говядиной и специями", price: "от 2 100 ₸", badge: null },
    { id: "p17", image: "/static/images/pizza/Cheesy-chicken.png", title: "Сырная Курица", description: "Курица, три вида сыра, помидоры", price: "от 2 000 ₸", badge: "Популярно" },
    { id: "p18", image: "/static/images/pizza/Chicken-burger-pizza.png", title: "Куриный Бургер", description: "Куриная булка с беконом и сыром", price: "от 1 950 ₸", badge: null },
    { id: "p19", image: "/static/images/pizza/Hawaiian.png", title: "Гавайская классическая", description: "Ветчина, ананас, моцарелла, томат", price: "от 1 750 ₸", badge: null },
    { id: "p20", image: "/static/images/pizza/Julienne.png", title: "Жульен", description: "Картофель с беконом и сливочным соусом", price: "от 1 850 ₸", badge: "Новинка" },
    { id: "p21", image: "/static/images/pizza/Sweet-Chilli-shrimp.png", title: "Сладкие Креветки с Чили", description: "Креветки, сладкий соус, перец, специи", price: "от 2 550 ₸", badge: null }
];

const combos = [
    { id: "c1", image: "/static/images/combo/2-pizzas-and-drink.png", title: "Комбо 2 пиццы + напиток", description: "2 пиццы на выбор + напиток", price: "от 3 990 ₸", badge: "Выгодно" },
    { id: "c2", image: "/static/images/combo/3-pizzas.png", title: "3 пиццы", description: "На выбор + салат + соус", price: "от 5 990 ₸", badge: "Выгодно" },
    { id: "c3", image: "/static/images/combo/Salad-and-appetizer.png", title: "Салат и закуска", description: "Свежий салат + любая закуска", price: "от 1 990 ₸", badge: null },
    { id: "c4", image: "/static/images/combo/4-snacks.png", title: "4 закуски", description: "На выбор из ассортимента", price: "от 2 990 ₸", badge: null },
    { id: "c5", image: "/static/images/combo/Meal-from-3900.png", title: "Семейный комбо", description: "4 пиццы + 2 напитка + закуска", price: "от 7 990 ₸", badge: null },
    { id: "c6", image: "/static/images/combo/Pepperobi-combo.png", title: "Пепперони комбо", description: "2 пепперони пиццы + напиток", price: "от 4 490 ₸", badge: "Хит" },
    { id: "c7", image: "/static/images/combo/3-pizzas-35cm.png", title: "Большой комбо 3 пиццы 35см", description: "Максимум пиццы для компании", price: "от 8 990 ₸", badge: "Выгодно" },
    { id: "c8", image: "/static/images/combo/2-pizzas.png", title: "Экспресс обед", description: "1 пицца + напиток + десерт", price: "от 2 490 ₸", badge: null }
];

const snacks = [
    { id: "s1", image: "/static/images/snacks/Dodster.png", title: "Додстер классический", description: "Ароматная булка с говядиной и соусом", price: "от 1 290 ₸", badge: null },
    { id: "s2", image: "/static/images/snacks/Dodster-Chill-Grill.png", title: "Додстер Чилл-Гриль", description: "Острая версия с перцем чили", price: "от 1 490 ₸", badge: "Острое" },
    { id: "s3", image: "/static/images/snacks/Ham-Dodster.png", title: "Додстер с ветчиной", description: "Булка с ветчиной и сыром", price: "от 1 390 ₸", badge: null },
    { id: "s4", image: "/static/images/snacks/Meat-Feast-Dodster.png", title: "Додстер мясное наслаждение", description: "Булка с колбасой и беконом", price: "от 1 590 ₸", badge: "Популярно" },
    { id: "s5", image: "/static/images/snacks/Teriyaki-Dodster.png", title: "Додстер Терияки", description: "Булка с курицей в соусе терияки", price: "от 1 490 ₸", badge: null },
    { id: "s6", image: "/static/images/snacks/Spicy-Dodster.png", title: "Додстер острый", description: "Жаркая закуска для любителей острого", price: "от 1 290 ₸", badge: "Острое" },
    { id: "s7", image: "/static/images/snacks/Chicken-roll.png", title: "Куриный рулет", description: "Хрустящий рулет с курицей и сыром", price: "от 890 ₸", badge: null },
    { id: "s8", image: "/static/images/snacks/Chicken-Ham-&-Cheese-Dandwich.png", title: "Сэндвич курица-ветчина-сыр", description: "Классический сэндвич с тремя вкусами", price: "от 1 190 ₸", badge: null },
    { id: "s9", image: "/static/images/snacks/Chorizo-BBQ-Dandwich.png", title: "Сэндвич Чоризо BBQ", description: "Пикантный сэндвич с чоризо и соусом BBQ", price: "от 1 290 ₸", badge: null }
];

const milkshakes = [
    { id: "m1", image: "/static/images/milkshakes/Classic-Milkshake.png", title: "Классический молочный коктейль", description: "Свежее молоко, мороженое, ваниль", price: "от 890 ₸", badge: null },
    { id: "m2", image: "/static/images/milkshakes/Chocolate-milkshake.png", title: "Шоколадный коктейль", description: "Молоко, шоколадный соус, мороженое", price: "от 990 ₸", badge: "Популярно" },
    { id: "m3", image: "/static/images/milkshakes/Oreo-Milkshake.png", title: "Орео коктейль", description: "Молоко, печенье Орео, мороженое", price: "от 1 090 ₸", badge: "Новинка" },
    { id: "m4", image: "/static/images/milkshakes/Milkshake-Pistachio.png", title: "Фисташковый коктейль", description: "Молоко, фисташковый сок, мороженое", price: "от 1 190 ₸", badge: null }
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
                <img src="${safeImage}" alt="${product.title}" onerror="this.onerror=null;this.src='/static/images/Empty.svg';">
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

function renderAll(popular, pizzasArr, combosArr, snacksArr, milkshakesArr) {
    const popularEl = document.getElementById('popularProducts');
    const pizzasEl = document.getElementById('pizzasProducts');
    const combosEl = document.getElementById('combosProducts');
    const snacksEl = document.getElementById('snacksProducts');
    const milkshakesEl = document.getElementById('milkshakesProducts');

    if (popularEl) popularEl.innerHTML = popular.map(createProductCard).join('');
    if (pizzasEl) pizzasEl.innerHTML = pizzasArr.map(createProductCard).join('');
    if (combosEl) combosEl.innerHTML = combosArr.map(createProductCard).join('');
    if (snacksEl) snacksEl.innerHTML = snacksArr.map(createProductCard).join('');
    if (milkshakesEl) milkshakesEl.innerHTML = milkshakesArr.map(createProductCard).join('');

    // Build products map for quick lookup
    const allProducts = [...(popular || []), ...(pizzasArr || []), ...(combosArr || []), ...(snacksArr || []), ...(milkshakesArr || [])];
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
    { id: 'a1', name: 'Моцарелла', price: 150, image: '/static/images/additives/Mozzarella cheese.png' },
    { id: 'a2', name: 'Шампиньоны', price: 200, image: '/static/images/additives/Mushrooms.png' },
    { id: 'a3', name: 'Ананас', price: 180, image: '/static/images/additives/Pineapple.png' },
    { id: 'a4', name: 'Халапеньо', price: 120, image: '/static/images/additives/jalapenos.png' },
    { id: 'a5', name: 'Чеснок', price: 80, image: '/static/images/additives/garlic.png' },
    { id: 'a6', name: 'Курица', price: 220, image: '/static/images/additives/Chicken.png' },
    { id: 'a7', name: 'Красный лук', price: 90, image: '/static/images/additives/Red onion.png' },
    { id: 'a8', name: 'Сладкий перец', price: 110, image: '/static/images/additives/Sweet pepper.png' }
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
    modalProductImage.onerror = function() { this.onerror = null; this.src = '/static/images/Empty.svg'; };

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
                <img class="addon-image" src="${imgSrc}" alt="${a.name}" onerror="this.onerror=null;this.src='/static/images/Empty.svg'">
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
            renderAll(
                data.popular || popularProducts,
                data.pizzas || pizzas,
                data.combos || combos,
                data.snacks || snacks,
                data.milkshakes || milkshakes
            );
            return;
        }
    } catch (e) {
        console.warn('API fetch failed, falling back to local data', e);
    }

    // Fallback
    renderAll(popularProducts, pizzas, combos, snacks, milkshakes);

    // If URL contains ?id=... open modal on initial load (deep-link)
    try {
        const id = new URLSearchParams(location.search).get('id');
        if (id && window.productsMap && window.productsMap[id]) {
            openProductModal(window.productsMap[id], false);
        }
    } catch (e) {}
}

init();

// ============= Auth Modal Management =============
const authModal = document.getElementById('authModal');
const authModalClose = document.getElementById('authModalClose');
const authBtn = document.getElementById('authBtn');
const loginTab = document.getElementById('loginTab');
const registerTab = document.getElementById('registerTab');
const switchToRegister = document.getElementById('switchToRegister');
const switchToLogin = document.getElementById('switchToLogin');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

// Toggle auth modal (use onclick to make it replaceable by updateAuthUI)
function openAuthModal() {
    if (!authModal) return;
    authModal.style.display = 'flex';
    // allow CSS transition
    requestAnimationFrame(() => authModal.classList.add('show'));
    document.body.classList.add('lock');
}

function closeAuthModal() {
    if (!authModal) return;
    authModal.classList.remove('show');
    document.body.classList.remove('lock');
    setTimeout(() => { if (authModal) authModal.style.display = 'none'; }, 260);
}

if (authBtn) authBtn.onclick = openAuthModal;
if (authModalClose) authModalClose.addEventListener('click', () => closeAuthModal());
// overlay close
const authModalOverlay = document.getElementById('authModalOverlay');
if (authModalOverlay) authModalOverlay.addEventListener('click', () => closeAuthModal());

// Helper to attach tab switchers inside injected fragments
function attachFragmentTabSwitchers() {
    const sToRegister = document.getElementById('switchToRegister');
    const sToLogin = document.getElementById('switchToLogin');
    if (sToRegister) sToRegister.addEventListener('click', async (e) => {
        e.preventDefault();
        await loadAuthFragment('register');
    });
    if (sToLogin) sToLogin.addEventListener('click', async (e) => {
        e.preventDefault();
        await loadAuthFragment('login');
    });
}

// Helper: show inline messages in auth modal
function showAuthMessage(el, message, type = 'error') {
    if (!el) return;
    el.textContent = message || '';
    el.className = 'auth-feedback ' + (type === 'success' ? 'auth-success' : (type === 'loading' ? 'auth-loading' : 'auth-error'));
    el.style.display = message ? 'block' : 'none';
}

function setButtonLoading(btn, loading = true) {
    if (!btn) return;
    btn.disabled = loading;
    btn.dataset.loading = loading ? '1' : '0';
}

// Attach login form submit handler for a given form element
function attachLoginListeners(formEl) {
    if (!formEl) return;
    formEl.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const errorDiv = document.getElementById('loginError');
        const submitBtn = formEl.querySelector('button[type="submit"]');

        // Basic validation
        if (!email || !password) {
            showAuthMessage(errorDiv, 'Пожалуйста, заполните все поля', 'error');
            return;
        }
        showAuthMessage(errorDiv, 'Отправка...', 'loading');
        setButtonLoading(submitBtn, true);
        
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                showAuthMessage(errorDiv, 'Успешный вход', 'success');
                updateAuthUI(data.user);
                closeAuthModal();
                formEl.reset();
                setTimeout(() => showAuthMessage(errorDiv, '', ''), 1200);
                // refresh to reflect session-protected content
                setTimeout(() => location.reload(), 300);
            } else {
                showAuthMessage(errorDiv, data.error || 'Ошибка входа', 'error');
            }
        } catch (error) {
            showAuthMessage(errorDiv, 'Ошибка сети: ' + error.message, 'error');
        }
        setButtonLoading(submitBtn, false);
    });
}

// Attach register form submit handler for a given form element
function attachRegisterListeners(formEl) {
    if (!formEl) return;
    formEl.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('registerName').value;
        const phone = document.getElementById('registerPhone') ? document.getElementById('registerPhone').value.trim() : '';
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const errorDiv = document.getElementById('registerError');
        const submitBtn = formEl.querySelector('button[type="submit"]');

        // Basic validation
        if (!name || !email || !password) {
            showAuthMessage(errorDiv, 'Пожалуйста, заполните все поля', 'error');
            return;
        }
        // Optional: basic phone validation (allow empty)
        if (phone && !/^\+?\d[\d\s\-()]{5,}$/.test(phone)) {
            showAuthMessage(errorDiv, 'Введите корректный номер телефона', 'error');
            return;
        }
        showAuthMessage(errorDiv, 'Отправка...', 'loading');
        setButtonLoading(submitBtn, true);
        
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, phone, email, password })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                showAuthMessage(errorDiv, 'Регистрация успешна', 'success');
                updateAuthUI(data.user);
                closeAuthModal();
                formEl.reset();
                setTimeout(() => showAuthMessage(errorDiv, '', ''), 1200);
                setTimeout(() => location.reload(), 300);
            } else {
                showAuthMessage(errorDiv, data.error || 'Ошибка регистрации', 'error');
            }
        } catch (error) {
            showAuthMessage(errorDiv, 'Ошибка сети: ' + error.message, 'error');
        }
        setButtonLoading(submitBtn, false);
    });
}

// Update auth UI based on user state
function updateAuthUI(user) {
    if (!authBtn) return;
    // remove previous onclick to avoid duplicate handlers
    authBtn.onclick = null;
    if (user) {
        authBtn.innerHTML = `<i class="fas fa-user-check"></i><span class="auth-text">${user.name}</span>`;
        // clicking will log out
        authBtn.onclick = logoutUser;
        // small ARIA hint
        authBtn.title = 'Выйти';
    } else {
        authBtn.innerHTML = `<i class="fas fa-user"></i><span class="auth-text">Войти</span>`;
        // open modal with login fragment when not authenticated
        authBtn.onclick = async () => {
            try {
                await loadAuthFragment('login');
                openAuthModal();
            } catch (e) {
                // fallback to standalone page
                window.location.href = '/login';
            }
        };
        authBtn.title = 'Войти';
    }
}

// Load auth fragment (login/register), inject into modal content and attach handlers
async function loadAuthFragment(name) {
    if (!authModal) return;
    const contentEl = document.getElementById('authModalContent');
    if (!contentEl) return;
    const url = name === 'register' ? '/auth/register_fragment' : '/auth/login_fragment';
    const res = await fetch(url, { method: 'GET' });
    if (!res.ok) throw new Error('Не удалось загрузить форму');
    const html = await res.text();
    contentEl.innerHTML = html;

    // Attach close button inside content (if any)
    const innerClose = document.getElementById('authModalClose');
    if (innerClose) innerClose.addEventListener('click', () => closeAuthModal());

    // Attach tab switchers inside fragment
    attachFragmentTabSwitchers();

    // Attach form listeners if present
    const lf = document.getElementById('loginForm');
    const rf = document.getElementById('registerForm');
    if (lf) attachLoginListeners(lf);
    if (rf) attachRegisterListeners(rf);

    // Optionally focus first input
    const firstInput = contentEl.querySelector('input');
    if (firstInput) firstInput.focus();
}

// Logout function
async function logoutUser() {
    try {
        await fetch('/api/logout', { method: 'GET' });
        updateAuthUI(null);
        // reload to refresh session-dependent data
        location.reload();
    } catch (error) {
        console.error('Logout error:', error);
    }
}

// Check auth state on page load by asking server
async function checkAuth() {
    try {
        const res = await fetch('/api/me');
        if (res.ok) {
            const data = await res.json();
            if (data && data.user) {
                updateAuthUI(data.user);
                return;
            }
        }
    } catch (e) {
        // ignore network errors for auth check
    }
    updateAuthUI(null);
}

// Call checkAuth after init() to ensure UI reflects server session
// If login/register forms exist on standalone pages, attach handlers
if (loginForm) attachLoginListeners(loginForm);
if (registerForm) attachRegisterListeners(registerForm);

// Initialize products then check auth
init().then(() => checkAuth()).catch(() => checkAuth());
