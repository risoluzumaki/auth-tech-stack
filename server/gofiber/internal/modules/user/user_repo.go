package user

import (
	"errors"
	u "gofiber/pkg/utils"

	"gorm.io/gorm"
)

type UserRepositoryInterface interface {
	Create(username string, name string, email string, password string) error
	FindByEmail(email string) (*User, error)
	FindByID(id int) (*User, error)
}

type UserRepository struct {
	db *gorm.DB
}

func NewUserRepository(db *gorm.DB) *UserRepository {
	return &UserRepository{
		db: db,
	}
}

func (r *UserRepository) Create(
	username string, name string, email string, password string,
) error {

	user := &User{
		Username: username,
		Name:     name,
		Email:    email,
		Password: password,
	}

	err := r.db.Create(user).Error
	if err != nil {
		return err
	}
	return nil

}

func (r *UserRepository) FindByEmail(email string) (*User, error) {
	var user User

	err := r.db.Where("email = ?", email).First(&user).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, nil
	} else if err != nil {
		return nil, u.NewAppError(500, "Internal Server Error")
	}

	return &user, nil
}

func (r *UserRepository) FindByID(id int) (*User, error) {
	var user User
	err := r.db.Where("id = ?", id).First(&user).Error
	return &user, err
}
