package main

// Product represents a pizza product
type Product struct {
	ID          string `json:"id"`
	Image       string `json:"image"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Price       string `json:"price"`
	Badge       string `json:"badge,omitempty"`
}

// ProductsResponse wraps all product categories
type ProductsResponse struct {
	Popular    []Product `json:"popular"`
	Pizzas     []Product `json:"pizzas"`
	Combos     []Product `json:"combos"`
	Snacks     []Product `json:"snacks"`
	Milkshakes []Product `json:"milkshakes"`
}

// GetAllProducts returns all products in all categories
func GetAllProducts() ProductsResponse {
	return ProductsResponse{
		Popular: []Product{
			{ID: "1", Image: "/static/images/pizza/Arriva.png", Title: "Аррива!", Description: "Пепперони, острый перец, лук, томат", Price: "от 1 800 ₸", Badge: "Хит"},
			{ID: "2", Image: "/static/images/pizza/Cheesy.png", Title: "Сырная", Description: "Четыре вида сыра, томат, орегано", Price: "от 1 500 ₸", Badge: "Хит"},
			{ID: "3", Image: "/static/images/pizza/Chicken-Teriyaki.png", Title: "Терияки", Description: "Курица, соус терияки, ананас, лук", Price: "от 2 100 ₸"},
			{ID: "4", Image: "/static/images/pizza/Shrimps-with-pesto.png", Title: "Креветки со сладким чили", Description: "Креветки, перец, лук, сладкий соус чили", Price: "от 2 600 ₸", Badge: "Новинка"},
		},
		Pizzas: []Product{
			{ID: "p1", Image: "/static/images/pizza/Pesto-Pizza.png", Title: "Маргарита", Description: "Томат, сыр моцарелла, базилик", Price: "от 1 300 ₸"},
			{ID: "p2", Image: "/static/images/pizza/Ham-and-Cheese.png", Title: "Пепперони", Description: "Пепперони, сыр, томат, орегано", Price: "от 1 600 ₸", Badge: "Хит"},
			{ID: "p3", Image: "/static/images/pizza/Chorizo-fresh.png", Title: "Чоризо фреш", Description: "Чоризо, перец, томат, сыр", Price: "от 1 900 ₸", Badge: "Новинка"},
			{ID: "p4", Image: "/static/images/pizza/Double-Chicken.png", Title: "Мясное наслаждение", Description: "Говядина, пепперони, колбаса, бекон", Price: "от 2 200 ₸"},
			{ID: "p5", Image: "/static/images/pizza/Dodo-mix.png", Title: "Четыре сезона", Description: "Помидоры, грибы, артишоки, оливки", Price: "от 1 800 ₸"},
			{ID: "p6", Image: "/static/images/pizza/Chill-Grill.png", Title: "Дьявольская", Description: "Острая пепперони, перец халапеньо, острый соус", Price: "от 1 900 ₸", Badge: "Выгодно"},
			{ID: "p7", Image: "/static/images/pizza/Cheesy.png", Title: "Вегетарианская", Description: "Помидоры, перец, грибы, лук, оливки", Price: "от 1 400 ₸"},
			{ID: "p8", Image: "/static/images/pizza/Pizza-Halves.png", Title: "Гавайская", Description: "Ветчина, ананас, сыр, томат", Price: "от 1 700 ₸"},
			{ID: "p9", Image: "/static/images/pizza/Chicken-Teriyaki.png", Title: "Терияки", Description: "Курица, соус терияки, ананас, лук", Price: "от 2 100 ₸"},
			{ID: "p10", Image: "/static/images/pizza/Shrimps-with-pesto.png", Title: "Креветки со сладким чили", Description: "Креветки, перец, лук, сладкий соус чили", Price: "от 2 600 ₸", Badge: "Новинка"},
			{ID: "p11", Image: "/static/images/pizza/Arriva.png", Title: "Аррива!", Description: "Пепперони, острый перец, лук, томат", Price: "от 1 800 ₸", Badge: "Хит"},
			{ID: "p12", Image: "/static/images/pizza/Chicken-Ranch.png", Title: "Чикен Ранч", Description: "Курица, бекон, сыр, чеснок, соус ранч", Price: "от 2 000 ₸"},
			{ID: "p13", Image: "/static/images/pizza/Meat-Feast.png", Title: "Мясное наслаждение", Description: "Говядина, пепперони, колбаса, бекон", Price: "от 2 300 ₸", Badge: "Выгодно"},
			{ID: "p14", Image: "/static/images/pizza/Four-Seasons.png", Title: "Четыре сезона", Description: "Помидоры, грибы, артишоки, оливки", Price: "от 1 900 ₸"},
			{ID: "p15", Image: "/static/images/pizza/Create-your-own-pizza.png", Title: "Создай свою пиццу", Description: "Выбери ингредиенты на свой вкус", Price: "от 1 200 ₸", Badge: "Популярно"},
			{ID: "p16", Image: "/static/images/pizza/Burger-pizza.png", Title: "Бургер Пицца", Description: "Мясная булка с говядиной и специями", Price: "от 2 100 ₸"},
			{ID: "p17", Image: "/static/images/pizza/Cheesy-chicken.png", Title: "Сырная Курица", Description: "Курица, три вида сыра, помидоры", Price: "от 2 000 ₸", Badge: "Популярно"},
			{ID: "p18", Image: "/static/images/pizza/Chicken-burger-pizza.png", Title: "Куриный Бургер", Description: "Куриная булка с беконом и сыром", Price: "от 1 950 ₸"},
			{ID: "p19", Image: "/static/images/pizza/Hawaiian.png", Title: "Гавайская классическая", Description: "Ветчина, ананас, моцарелла, томат", Price: "от 1 750 ₸"},
			{ID: "p20", Image: "/static/images/pizza/Julienne.png", Title: "Жульен", Description: "Картофель с беконом и сливочным соусом", Price: "от 1 850 ₸", Badge: "Новинка"},
			{ID: "p21", Image: "/static/images/pizza/Sweet-Chilli-shrimp.png", Title: "Сладкие Креветки с Чили", Description: "Креветки, сладкий соус, перец, специи", Price: "от 2 550 ₸"},
		},
		Combos: []Product{
			{ID: "c1", Image: "/static/images/combo/2-pizzas-and-drink.png", Title: "Комбо 2 пиццы + напиток", Description: "2 пиццы на выбор + напиток", Price: "от 3 990 ₸", Badge: "Выгодно"},
			{ID: "c2", Image: "/static/images/combo/3-pizzas.png", Title: "3 пиццы", Description: "На выбор + салат + соус", Price: "от 5 990 ₸", Badge: "Выгодно"},
			{ID: "c3", Image: "/static/images/combo/Salad-and-appetizer.png", Title: "Салат и закуска", Description: "Свежий салат + любая закуска", Price: "от 1 990 ₸"},
			{ID: "c4", Image: "/static/images/combo/4-snacks.png", Title: "4 закуски", Description: "На выбор из ассортимента", Price: "от 2 990 ₸"},
			{ID: "c5", Image: "/static/images/combo/Meal-from-3900.png", Title: "Семейный комбо", Description: "4 пиццы + 2 напитка + закуска", Price: "от 7 990 ₸"},
			{ID: "c6", Image: "/static/images/combo/Pepperobi-combo.png", Title: "Пепперони комбо", Description: "2 пепперони пиццы + напиток", Price: "от 4 490 ₸", Badge: "Хит"},
			{ID: "c7", Image: "/static/images/combo/3-pizzas-35cm.png", Title: "Большой комбо 3 пиццы 35см", Description: "Максимум пиццы для компании", Price: "от 8 990 ₸", Badge: "Выгодно"},
			{ID: "c8", Image: "/static/images/combo/2-pizzas.png", Title: "Экспресс обед", Description: "1 пицца + напиток + десерт", Price: "от 2 490 ₸"},
		},
		Snacks: []Product{
			{ID: "s1", Image: "/static/images/snacks/Dodster.png", Title: "Додстер классический", Description: "Ароматная булка с говядиной и соусом", Price: "от 1 290 ₸"},
			{ID: "s2", Image: "/static/images/snacks/Dodster-Chill-Grill.png", Title: "Додстер Чилл-Гриль", Description: "Острая версия с перцем чили", Price: "от 1 490 ₸", Badge: "Острое"},
			{ID: "s3", Image: "/static/images/snacks/Ham-Dodster.png", Title: "Додстер с ветчиной", Description: "Булка с ветчиной и сыром", Price: "от 1 390 ₸"},
			{ID: "s4", Image: "/static/images/snacks/Meat-Feast-Dodster.png", Title: "Додстер мясное наслаждение", Description: "Булка с колбасой и беконом", Price: "от 1 590 ₸", Badge: "Популярно"},
			{ID: "s5", Image: "/static/images/snacks/Teriyaki-Dodster.png", Title: "Додстер Терияки", Description: "Булка с курицей в соусе терияки", Price: "от 1 490 ₸"},
			{ID: "s6", Image: "/static/images/snacks/Spicy-Dodster.png", Title: "Додстер острый", Description: "Жаркая закуска для любителей острого", Price: "от 1 290 ₸", Badge: "Острое"},
			{ID: "s7", Image: "/static/images/snacks/Chicken-roll.png", Title: "Куриный рулет", Description: "Хрустящий рулет с курицей и сыром", Price: "от 890 ₸"},
			{ID: "s8", Image: "/static/images/snacks/Chicken-Ham-&-Cheese-Dandwich.png", Title: "Сэндвич курица-ветчина-сыр", Description: "Классический сэндвич с тремя вкусами", Price: "от 1 190 ₸"},
			{ID: "s9", Image: "/static/images/snacks/Chorizo-BBQ-Dandwich.png", Title: "Сэндвич Чоризо BBQ", Description: "Пикантный сэндвич с чоризо и соусом BBQ", Price: "от 1 290 ₸"},
		},
		Milkshakes: []Product{
			{ID: "m1", Image: "/static/images/milkshakes/Classic-Milkshake.png", Title: "Классический молочный коктейль", Description: "Свежее молоко, мороженое, ваниль", Price: "от 890 ₸"},
			{ID: "m2", Image: "/static/images/milkshakes/Chocolate-milkshake.png", Title: "Шоколадный коктейль", Description: "Молоко, шоколадный соус, мороженое", Price: "от 990 ₸", Badge: "Популярно"},
			{ID: "m3", Image: "/static/images/milkshakes/Oreo-Milkshake.png", Title: "Орео коктейль", Description: "Молоко, печенье Орео, мороженое", Price: "от 1 090 ₸", Badge: "Новинка"},
			{ID: "m4", Image: "/static/images/milkshakes/Milkshake-Pistachio.png", Title: "Фисташковый коктейль", Description: "Молоко, фисташковый сок, мороженое", Price: "от 1 190 ₸"},
		},
	}
}
