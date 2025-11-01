package database

import (
	"gofiber/internal/modules/user"
	// "gofiber/pkg/database"
	"gofiber/pkg/utils"
	"log"

	"gorm.io/gorm"
)

func SeedData() {
	db := DB

	password, err := utils.Hashed("password123")
	if err != nil {
		log.Fatal("Failed to hash password:", err)
	}

	// Data seed user
	users := []user.User{
		{
			Username: "admin",
			Name:     "Admin User",
			Email:    "admin@example.com",
			Password: password,
			// Token biarkan kosong
		},
		{
			Username: "tomi1",
			Name:     "Tomi User",
			Email:    "tomi1@gmail.com",
			Password: password,
		},
		{
			Username: "jane",
			Name:     "Jane Doe",
			Email:    "jane.doe@gmail.com",
			Password: password,
		},
	}

	for _, u := range users {
		var existing user.User

		if err := db.Where("email = ?", u.Email).First(&existing).Error; err != nil {
			if err == gorm.ErrRecordNotFound {
				if err := db.Create(&u).Error; err != nil {
					log.Printf("Failed to seed user %s: %v", u.Email, err)
				} else {
					log.Printf("Seeded user: %s", u.Email)
				}
			} else {
				log.Printf("DB error: %v", err)
			}
		} else {
			log.Printf("User already exists: %s", u.Email)
		}
	}
}
