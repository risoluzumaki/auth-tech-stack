package middleware

import (
	"gofiber/pkg/logger"
	"gofiber/pkg/utils"
	"strings"

	"github.com/gofiber/fiber/v2"
)

func Auth(ctx *fiber.Ctx) error {
	// Ambil header Authorization
	authHeader := ctx.Get("Authorization")

	if authHeader == "" {
		return ctx.Status(401).JSON(fiber.Map{
			"message": "Token not found",
		})
	}

	// Strip "Bearer " jika ada
	token := strings.TrimSpace(strings.TrimPrefix(authHeader, "Bearer"))

	logger.Log.Debug("Token: ", token)

	claims, err := utils.VerifyToken(token)
	if err != nil {
		return ctx.Status(401).JSON(fiber.Map{
			"message": "Invalid token",
		})
	}

	logger.Log.Debug("Claims: ", claims)

	// Set locals agar bisa dipakai di handler berikutnya
	ctx.Locals("user_id", claims.UserID)
	ctx.Locals("email", claims.Email)

	return ctx.Next()
}
