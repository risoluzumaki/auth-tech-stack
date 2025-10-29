package auth

import (
	up "gofiber/internal/modules/user"
	u "gofiber/pkg/utils"

	"github.com/gofiber/fiber/v2"
)

type AuthHandler struct {
	authService *AuthService
}

func NewAuthHandler(authService *AuthService) *AuthHandler {
	return &AuthHandler{
		authService: authService,
	}

}

func (h *AuthHandler) RegisterUser(ctx *fiber.Ctx) error {
	var userDto up.RegisterUserDto
	if err := ctx.BodyParser(&userDto); err != nil {
		return u.NewAppError(400, "Invalid request body")
	}

	err := h.authService.RegisterUser(
		userDto.Username,
		userDto.Name,
		userDto.Email,
		userDto.Password,
	)

	if err != nil {
		return err
	}

	return ctx.Status(201).JSON(
		fiber.Map{
			"message": "User registered successfully",
		},
	)
}

func (h *AuthHandler) LoginUser(ctx *fiber.Ctx) error {
	var userDto up.LoginUserDto
	if err := ctx.BodyParser(&userDto); err != nil {
		return u.NewAppError(400, "Invalid request body")
	}

	_, err := h.authService.LoginUser(userDto.Email, userDto.Password)
	if err != nil {
		return err
	}

	return ctx.Status(200).JSON(fiber.Map{
		"message": "Login Success",
	})
}
