package repositories

import (
	"database/sql"
	"plant-tissue-backend/models"
)

type UserRepo struct {
	DB *sql.DB
}

func NewUserRepo(db *sql.DB) *UserRepo {
	return &UserRepo{
		DB: db,
	}
}

func (r *UserRepo) FindByUsername(username string) (*models.Platform_users, error) {
  var data models.Platform_users
  row:=r.DB.QueryRow(`select id,username, password_hash,avatar from platform_users where username=$1`, username)
  row.Scan(&data.Id, &data.Username,&data.Password_hash, &data.Avatar)
	return &data, nil
}

func (r *UserRepo) CreateUser(user *models.Platform_users) (*models.Platform_users, error) {
	var data models.Platform_users
  row:=r.DB.QueryRow(`insert into platform_users (username,password_hash)
              values ($1, $2)
              returning id, username;`, user.Username, user.Password_hash)
  row.Scan(&data.Id, &data.Username)
  return &data, nil
}
