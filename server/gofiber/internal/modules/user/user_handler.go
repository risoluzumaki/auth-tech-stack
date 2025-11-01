package user

import (
	"gofiber/pkg/logger"

	"github.com/gofiber/fiber/v2"
)

type UserHandler struct {
	userService *UserService
}

func NewUserHandler(userService *UserService) *UserHandler {
	return &UserHandler{
		userService: userService,
	}
}

func (h *UserHandler) ProfileUser(ctx *fiber.Ctx) error {
	logger.Log.Debug("ProfileUser Handler")
	ctxUserId := ctx.Locals("user_id") // Unknown type
	logger.Log.Debugf("Type of userId: %T, value: %v", ctxUserId, ctxUserId)
	userId, ok := ctxUserId.(int)
	if !ok {
		return ctx.Status(401).JSON(fiber.Map{
			"message": "Unauthorized",
		})
	}
	userIdUint := uint(userId)
	logger.Log.Debug("userIdUint", userIdUint)
	user, err := h.userService.ProfileUser(userIdUint)
	if err != nil {
		return err
	}

	response := &ProfileUserDto{
		ID:       user.ID,
		Username: user.Username,
		Name:     user.Name,
		Email:    user.Email,
	}

	return ctx.Status(200).JSON(response)
}
