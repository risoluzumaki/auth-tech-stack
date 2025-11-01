package auth

import (
	// "gofiber/internal/middleware"

	"github.com/gofiber/fiber/v2"
)

func AuthRoute(r fiber.Router, h *AuthHandler) {
	r.Post("/register", h.RegisterUser)
	r.Post("/login", h.LoginUser)
}
