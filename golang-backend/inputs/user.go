package inputs

import (
	"errors"
	"log"
	"mime/multipart"
)

type GetUserInput struct {
  Id int `json:"id" form:"id"`
}

type UserLocal struct {
  Username string `json:"username" form:"username"`
	Password string `json:"password" form:"password"`
}

type UserLocalRegistration struct {
	Username        string `json:"username" form:"username"`
	Password        string `json:"password" form:"password"`
	Password_repeat string `json:"password_repeat" form:"password_repeat"`
}

type UserAvatar struct {
  UserId int `json:"user_id" form:"user_id"`
	Avatar *multipart.FileHeader `json:"avatar" form:"avatar"`
}



func ParseUserLocalRegistration(user UserLocalRegistration) (*UserLocalRegistration, error) {
  log.Println(user.Password, user.Password_repeat)
	username := user.Username
	password := user.Password
	password_repeat := user.Password_repeat

	if len(username) < 4 {
		return nil, errors.New("Поле 'Имя пользователя' должно содержать не менее 4 знаков")
	}

	if password != password_repeat {
		return nil, errors.New("Пароли не совпадают")
	}

	return &UserLocalRegistration{
		Username:        username,
		Password:        password,
		Password_repeat: password_repeat,
  }, nil
}
