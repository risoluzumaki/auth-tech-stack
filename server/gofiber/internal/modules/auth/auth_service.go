package auth

import (
	ur "gofiber/internal/modules/user"
	u "gofiber/pkg/utils"
)

type AuthServiceInterface interface {
	RegisterUser(username string, name string, email string, password string) error
	LoginUser(email string) (*ur.User, error)
}

type AuthService struct {
	userRepository ur.UserRepositoryInterface
}

func NewAuthService(userRepository ur.UserRepositoryInterface) *AuthService {
	return &AuthService{
		userRepository: userRepository,
	}
}

func (s *AuthService) RegisterUser(
	username string, name string, email string, password string,
) error {

	user, err := s.userRepository.FindByEmail(email)
	if err != nil {
		return err
	}
	if user != nil {
		return u.NewAppError(409, "Email already registered")
	}

	// Hashed Password
	passwordHashed, err := u.Hashed(password)
	if err != nil {
		return u.NewAppError(500, "Failed to hash password")
	}

	if err := s.userRepository.Create(username, name, email, passwordHashed); err != nil {
		return u.NewAppError(500, "Failed to register user")
	}

	return nil
}

func (s *AuthService) LoginUser(email string, password string) (*ur.User, error) {
	user, err := s.userRepository.FindByEmail(email)
	if err != nil {
		return nil, u.NewAppError(404, "User not found")
	}
	passwordCompare, err := u.Compare(password, user.Password)
	if err != nil || !passwordCompare {
		return nil, u.NewAppError(401, "Invalid credentials")
	}

	return user, nil
}
