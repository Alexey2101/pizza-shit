package main

import (
	"fmt"
	"log"
	"os"
	"os/exec"
	"os/signal"
	"runtime"
	"sync"
	"syscall"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/session"
	"golang.org/x/crypto/bcrypt"
)

// User represents a user in the system
type User struct {
	ID       string `json:"id"`
	Email    string `json:"email"`
	Password string `json:"-"` // never send password to client
	Name     string `json:"name"`
	Phone    string `json:"phone,omitempty"`
}



// In-memory user storage
var (
	users = make(map[string]*User)
	mu    sync.RWMutex
)

// Session store
var store *session.Store

func init() {
	// session.New returns *session.Store
	store = session.New()
}

// openBrowser attempts to open URL in default browser
func openBrowser(url string) error {
	var cmd *exec.Cmd
	switch runtime.GOOS {
	case "windows":
		cmd = exec.Command("rundll32", "url.dll,FileProtocolHandler", url)
	case "darwin":
		cmd = exec.Command("open", url)
	default:
		cmd = exec.Command("xdg-open", url)
	}
	return cmd.Start()
}

// registerHandler handles user registration
func registerHandler(c *fiber.Ctx) error {
	type RegisterRequest struct {
		Email    string `json:"email"`
		Password string `json:"password"`
		Name     string `json:"name"`
		Phone    string `json:"phone"`
	}

	var req RegisterRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Ошибка при разборе данных",
		})
	}

	// Validate input
	if req.Email == "" || req.Password == "" || req.Name == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Email, пароль и имя обязательны",
		})
	}

	// Check if user already exists
	mu.RLock()
	_, exists := users[req.Email]
	mu.RUnlock()

	if exists {
		return c.Status(fiber.StatusConflict).JSON(fiber.Map{
			"error": "Пользователь с таким email уже существует",
		})
	}

	// Hash password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Ошибка при хешировании пароля",
		})
	}

	// Create new user
	user := &User{
		ID:       fmt.Sprintf("user_%d", time.Now().UnixNano()),
		Email:    req.Email,
		Password: string(hashedPassword),
		Name:     req.Name,
		Phone:    req.Phone,
	}

	mu.Lock()
	users[req.Email] = user
	mu.Unlock()

	// Store user ID in session
	sess, err := store.Get(c)
	if err != nil {
		return err
	}
	sess.Set("user_id", user.ID)
	sess.Set("user_email", user.Email)
	sess.Set("user_name", user.Name)
	sess.Set("user_phone", user.Phone)
	if err := sess.Save(); err != nil {
		return err
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"message": "Пользователь успешно зарегистрирован",
		"user": fiber.Map{
			"id":    user.ID,
			"email": user.Email,
			"name":  user.Name,
			"phone": user.Phone,
		},
	})
}

// loginHandler handles user login
func loginHandler(c *fiber.Ctx) error {
	type LoginRequest struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	var req LoginRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Ошибка при разборе данных",
		})
	}

	// Validate input
	if req.Email == "" || req.Password == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Email и пароль обязательны",
		})
	}

	// Find user
	mu.RLock()
	user, exists := users[req.Email]
	mu.RUnlock()

	if !exists {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "Неправильный email или пароль",
		})
	}

	// Verify password
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password)); err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "Неправильный email или пароль",
		})
	}

	// Store user ID in session
	sess, err := store.Get(c)
	if err != nil {
		return err
	}
	sess.Set("user_id", user.ID)
	sess.Set("user_email", user.Email)
	sess.Set("user_name", user.Name)
	sess.Set("user_phone", user.Phone)
	if err := sess.Save(); err != nil {
		return err
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Вход выполнен успешно",
		"user": fiber.Map{
			"id":    user.ID,
			"email": user.Email,
			"name":  user.Name,
			"phone": user.Phone,
		},
	})
}

// logoutHandler handles user logout
func logoutHandler(c *fiber.Ctx) error {
	sess, err := store.Get(c)
	if err != nil {
		return err
	}
	if err := sess.Destroy(); err != nil {
		return err
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Вы успешно вышли",
	})
}

// meHandler returns current user info
func meHandler(c *fiber.Ctx) error {
	sess, err := store.Get(c)
	if err != nil {
		return err
	}

	userID := sess.Get("user_id")
	if userID == nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "Не авторизованы",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"user": fiber.Map{
			"id":    userID,
			"email": sess.Get("user_email"),
			"name":  sess.Get("user_name"),
			"phone": sess.Get("user_phone"),
		},
	})
}

// productsHandler returns all products
func productsHandler(c *fiber.Ctx) error {
	response := GetAllProducts()
	c.Set("Content-Type", "application/json")
	return c.JSON(response)
}

func main() {
	app := fiber.New()

	// Middleware
	app.Use(logger.New())
	app.Use(cors.New())
	// Session store is initialized in init() and used inside handlers via store.Get(c)

	// Serve static files
	app.Static("/static", "./static")

	// API Routes
	app.Post("/api/register", registerHandler)
	app.Post("/api/login", loginHandler)
	app.Get("/api/logout", logoutHandler)
	app.Get("/api/me", meHandler)
	app.Get("/api/products", productsHandler)

	// Page Routes
	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendFile("templates/index.html")
	})

	app.Get("/login", func(c *fiber.Ctx) error {
		return c.SendFile("templates/login.html")
	})

	app.Get("/register", func(c *fiber.Ctx) error {
		return c.SendFile("templates/register.html")
	})

	// Fragments for modal load on the main page
	app.Get("/auth/login_fragment", func(c *fiber.Ctx) error {
		return c.SendFile("templates/auth_login_fragment.html")
	})
	app.Get("/auth/register_fragment", func(c *fiber.Ctx) error {
		return c.SendFile("templates/auth_register_fragment.html")
	})

	app.Get("/product/:id", func(c *fiber.Ctx) error {
		return c.SendFile("templates/product.html")
	})

	// Start browser
	url := "http://localhost:8181"
	log.Printf("Server is starting on %s\n", url)
	if err := openBrowser(url); err != nil {
		log.Printf("Failed to open browser: %v", err)
	}

	// Graceful shutdown
	go func() {
		sigchan := make(chan os.Signal, 1)
		signal.Notify(sigchan, syscall.SIGINT, syscall.SIGTERM)
		<-sigchan
		log.Println("Server is shutting down...")
		app.Shutdown()
	}()

	// Start server
	if err := app.Listen(":8181"); err != nil {
		log.Fatalf("Server error: %v", err)
	}

	log.Println("Server gracefully stopped")
}
