package user

import (
	"gofiber/internal/middleware"

	"github.com/gofiber/fiber/v2"
)

func UserRoute(r fiber.Router, h *UserHandler) {

	r.Get("/profile", middleware.Auth, h.ProfileUser)
}
