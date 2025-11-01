package main

import (
	"gofiber/internal/bootstrap"

	"github.com/joho/godotenv"
)

func main() {
	godotenv.Load()
	bootstrap.Bootstrapp()
}
