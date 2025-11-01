package bootstrap

import (
	"errors"
	"fmt"
	"gofiber/internal/modules/auth"
	"gofiber/internal/modules/user"
	database "gofiber/pkg/database"
	log "gofiber/pkg/logger"
	"gofiber/pkg/utils"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
	"github.com/joho/godotenv"
)

func Bootstrapp() {
	log.Init()
	godotenv.Load()
	database.ConnectDatabase()
	database.SeedData()
	db := database.DB

	app := fiber.New(fiber.Config{
		ErrorHandler: func(c *fiber.Ctx, err error) error {
			// Defualt Err
			code := fiber.StatusInternalServerError
			message := "Internal Server Error"

			// Custom Err
			var appErr *utils.AppError
			if ok := errors.As(err, &appErr); ok {
				code = appErr.Code
				message = appErr.Msg
			}

			// Fiber err
			if e, ok := err.(*fiber.Error); ok {
				code = e.Code
				message = e.Message
			}

			return c.Status(code).JSON(fiber.Map{
				"code":    code,
				"message": message,
			})
		},
	})

	// GLOBAL MIDDLEWARE
	app.Use(cors.New(
		cors.Config{
			AllowOrigins: "*",
			AllowHeaders: "*",
		},
	))
	app.Use(logger.New())
	app.Use(recover.New())

	// WIRING DEPENDENCY
	userRepository := user.NewUserRepository(db) //Sharing DEPEND

	// AUTH MODULE
	authService := auth.NewAuthService(userRepository)
	authHandler := auth.NewAuthHandler(authService)

	//  USER MODULE
	userService := user.NewUserService(userRepository)
	userHandler := user.NewUserHandler(userService)

	// RPOUTING GROUPING
	api := app.Group("/api/v1")
	authRoute := api.Group("/auth")
	userRoute := api.Group("/user")

	auth.AuthRoute(authRoute, authHandler)
	user.UserRoute(userRoute, userHandler)

	fmt.Println("Launch")

	port := os.Getenv("PORT_APP")
	if port == "" {
		port = "8080"
	}
	fmt.Println(port)
	app.Listen(":" + port)
}
