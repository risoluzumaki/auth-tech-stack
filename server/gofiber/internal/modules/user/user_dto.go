package user

type RegisterUserDto struct {
	Username string
	Name     string
	Email    string
	Password string
}

type LoginUserDto struct {
	Email    string
	Password string
}

type LoginResponseDto struct {
	AccessToken  string
	RefreshToken string
}

type ProfileUserDto struct {
	ID       uint
	Username string
	Name     string
	Email    string
}
