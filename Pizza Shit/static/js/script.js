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

async function init() {
    try {
        const res = await fetch('/api/products');
        if (res.ok) {
            const data = await res.json();
            renderAll(
                data.popular || [],
                data.pizzas || [],
                data.combos || [],
                data.snacks || [],
                data.milkshakes || []
            );
            return;
        }
    } catch (e) {
        console.warn('API fetch failed, products will not be rendered', e);
    }

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
