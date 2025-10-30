// Product Data (local fallback)
const popularProducts = [
    { id: "1", image: "/Images/pizza/Arriva.png", title: "Аррива!", description: "Пепперони, острый перец, лук, томат", price: "от 1 800 ₸", badge: "Хит" },
    { id: "2", image: "/Images/pizza/Cheesy.png", title: "Сырная", description: "Четыре вида сыра, томат, орегано", price: "от 1 500 ₸", badge: "Хит" },
    { id: "3", image: "/Images/pizza/Chicken Teriyaki.png", title: "Терияки", description: "Курица, соус терияки, ананас, лук", price: "от 2 100 ₸", badge: null },
    { id: "4", image: "/Images/pizza/Shrimps with pesto.png", title: "Креветки со сладким чили", description: "Креветки, перец, лук, сладкий соус чили", price: "от 2 600 ₸", badge: "Новинка" }
];

const pizzas = [
    { id: "p1", image: "/Images/pizza/Pesto Pizza.png", title: "Маргарита", description: "Томат, сыр моцарелла, базилик", price: "от 1 300 ₸", badge: null },
    { id: "p2", image: "/Images/pizza/Ham & Cheese.png", title: "Пепперони", description: "Пепперони, сыр, томат, орегано", price: "от 1 600 ₸", badge: "Хит" },
    { id: "p3", image: "/Images/pizza/Chorizo fresh.png", title: "Чоризо фреш", description: "Чоризо, перец, томат, сыр", price: "от 1 900 ₸", badge: "Новинка" },
    { id: "p4", image: "/Images/pizza/Double Chicken.png", title: "Мясное наслаждение", description: "Говядина, пепперони, колбаса, бекон", price: "от 2 200 ₸", badge: null },
    { id: "p5", image: "/Images/pizza/Dodo mix.png", title: "Четыре сезона", description: "Помидоры, грибы, артишоки, оливки", price: "от 1 800 ₸", badge: null },
    { id: "p6", image: "/Images/pizza/Chill Grill.png", title: "Дьявольская", description: "Острая пепперони, перец халапеньо, острый соус", price: "от 1 900 ₸", badge: "Выгодно" },
    { id: "p7", image: "/Images/pizza/Cheesy.png", title: "Вегетарианская", description: "Помидоры, перец, грибы, лук, оливки", price: "от 1 400 ₸", badge: null },
    { id: "p8", image: "/Images/pizza/Pizza Halves.png", title: "Гавайская", description: "Ветчина, ананас, сыр, томат", price: "от 1 700 ₸", badge: null }
];

const combos = [
    { id: "c1", image: "/Images/pizza/Pizza Halves.png", title: "Комбо за 3990 ₸", description: "2 пиццы + напиток + закуска", price: "3 990 ₸", badge: "Выгодно" },
    { id: "c2", image: "/Images/pizza/Dodo mix.png", title: "3 пиццы", description: "На выбор + салат + соус", price: "5 990 ₸", badge: "Выгодно" },
    { id: "c3", image: "/Images/pizza/Pizza Halves.png", title: "Семейный комбо", description: "4 пиццы + 2 напитка + закуска", price: "7 990 ₸", badge: null },
    { id: "c4", image: "/Images/pizza/Arriva.png", title: "Экспресс обед", description: "1 пицца + напиток + десерт", price: "2 490 ₸", badge: null }
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
                <img src="${safeImage}" alt="${product.title}">
                ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
            </div>
            <div class="product-content">
                <div class="product-info">
                    <h3 class="product-title">${product.title}</h3>
                    <p class="product-description">${product.description}</p>
                </div>
                <div class="product-footer">
                    <span class="product-price">${product.price}</span>
                    <button class="add-to-cart-btn" aria-label="Добавить в корзину">
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

    // Re-attach add-to-cart handlers
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            alert('Товар добавлен в корзину!');
        });
    });
}

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
}

init();
