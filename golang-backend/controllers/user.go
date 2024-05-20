package controllers

import (
	"database/sql"
	"net/http"
	"plant-tissue-backend/helpers"
	"plant-tissue-backend/inputs"
	"plant-tissue-backend/models"
	"plant-tissue-backend/repositories"
)

type UserController struct {
	DB *sql.DB
}


func (c *UserController) CreateUser(w http.ResponseWriter, r *http.Request) error {
	var body inputs.UserLocalRegistration
	decodeJSONBody(w, r, &body)

	body_parsed, err := inputs.ParseUserLocalRegistration(body)
	if err != nil {
    return WriteJSON(w, 401, err.Error())
	}
	hashed_password, err := helpers.HashPassword(body_parsed.Password)
	if err != nil {
    return WriteJSON(w, 401, "Not logged in")
	}

	new_user := models.Platform_users{
		Username:      body.Username,
		Password_hash: &hashed_password,
	}

	repo := repositories.UserRepo{DB: c.DB}
	created_user, err := repo.CreateUser(&new_user)

	return WriteJSON(w, 200, created_user)
}

func (c *UserController) Login (w http.ResponseWriter, r *http.Request) error {
  var body inputs.UserLocal
  decodeJSONBody(w,r,&body)
  repo:= repositories.UserRepo{DB: c.DB}
  user, err:= repo.FindByUsername(body.Username)
  if(err!=nil) {
    return err
  }
  if password_valid:=helpers.CheckPasswordHash(body.Password, *user.Password_hash);
      !password_valid {
    return WriteJSON(w, 401, "Not logged in")
  }

  token, err:=helpers.CreateToken(user.Id)
  if(err!=nil) {
    return WriteJSON(w, 401, err.Error())
  }

  w.Header().Set("Authorization", "Bearer"+" "+token)
  user.Password_hash = nil
  return WriteJSON(w, http.StatusOK, user)
}

func (c *UserController) Logout(w http.ResponseWriter, h *http.Request) error {
  w.Header().Set("Authorization", "")
  return WriteJSON(w, http.StatusOK, "")
}
