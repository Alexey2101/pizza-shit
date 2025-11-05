package main

import (
	"html/template"
	"log"
	"net/http"
)

type Product struct {
    ID          string
    Title       string
    Description string
    Image       string
    Price       int
}

// Центральное хранилище продуктов (используется в хэндлерах)
var products = []Product{
    {
        ID:          "cheese-pizza",
        Title:       "Сырная",
        Description: "Моцарелла, сыры чеддер и пармезан, соус альфредо",
    Image:       "static/images/pizza/cheese-pizza.jpg",
        Price:       3200,
    },
    {
        ID:          "pepperoni",
        Title:       "Пепперони",
        Description: "Пепперони, увеличенная порция моцареллы, томатный соус",
    Image:       "static/images/pizza/pepperoni.jpg",
        Price:       3400,
    },
}

var productsMap map[string]Product

var templates *template.Template

func homePage(w http.ResponseWriter, r *http.Request) {
    if r.URL.Path != "/" {
        http.NotFound(w, r)
        return
    }
    // Рендерим шаблон index.html с глобальным списком продуктов
    w.Header().Set("Content-Type", "text/html; charset=utf-8")
    if templates == nil {
        // на случай, если шаблоны не загружены
        log.Printf("шаблоны не инициализированы")
        http.Error(w, "Внутренняя ошибка сервера", http.StatusInternalServerError)
        return
    }

    if err := templates.ExecuteTemplate(w, "index.html", products); err != nil {
        log.Printf("Ошибка рендеринга index.html: %v", err)
        http.Error(w, "Внутренняя ошибка сервера", http.StatusInternalServerError)
        return
    }
}

func productPage(w http.ResponseWriter, r *http.Request) {
    // Получаем ID продукта из URL
    id := r.URL.Query().Get("id")
    if id == "" {
        http.Error(w, "ID продукта не указан", http.StatusBadRequest)
        return
    }

    // Поиск продукта в централизованной карте
    if productsMap == nil {
        // инициализируем карту из слайса при первом обращении
        productsMap = make(map[string]Product)
        for _, p := range products {
            productsMap[p.ID] = p
        }
    }

    product, exists := productsMap[id]
    if !exists {
        log.Printf("Продукт не найден: %s", id)
        http.Error(w, "Продукт не найден", http.StatusNotFound)
        return
    }

    w.Header().Set("Content-Type", "text/html; charset=utf-8")
    if templates == nil {
        log.Printf("шаблоны не инициализированы")
        http.Error(w, "Внутренняя ошибка сервера", http.StatusInternalServerError)
        return
    }

    if err := templates.ExecuteTemplate(w, "product.html", product); err != nil {
        log.Printf("Ошибка рендеринга product.html: %v", err)
        http.Error(w, "Внутренняя ошибка сервера", http.StatusInternalServerError)
        return
    }
}

func main() {
    // Статические файлы
    fs := http.FileServer(http.Dir("static"))
    http.Handle("/static/", http.StripPrefix("/static/", fs))

    // Загружаем шаблоны один раз
    var err error
    templates, err = template.ParseGlob("templates/*.html")
    if err != nil {
        log.Fatalf("Не удалось загрузить шаблоны: %v", err)
    }

    // Маршруты
    http.HandleFunc("/", homePage)
    http.HandleFunc("/product", productPage)

    log.Println("Сервер запущен на http://localhost:8080")
    if err := http.ListenAndServe(":8080", nil); err != nil {
        log.Fatal(err)
    }
}