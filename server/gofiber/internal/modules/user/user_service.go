package user

import "gofiber/pkg/logger"

type UserServiceInterface interface {
	ProfileUser(id uint) (*User, error)
}

type UserService struct {
	userRepository UserRepositoryInterface
}

func NewUserService(userRepository UserRepositoryInterface) *UserService {
	return &UserService{
		userRepository: userRepository,
	}
}

func (s *UserService) ProfileUser(id uint) (*User, error) {
	logger.Log.Debug("ProfileUser Service Excute")
	user, err := s.userRepository.FindByID(id)
	if err != nil {
		return nil, err
	}
	return user, nil
}
