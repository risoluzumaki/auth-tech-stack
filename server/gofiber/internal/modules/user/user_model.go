package user

type User struct {
	ID       uint `gorm:"primaryKey:autoIncrement"`
	Username string
	Name     string
	Email    string `gorm:"uniqueIndex"`
	Password string
	Token    string
}
