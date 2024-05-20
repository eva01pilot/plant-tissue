package controllers

import (
	"database/sql"
	"net/http"
	"plant-tissue-backend/repositories"
)

type ComponentTypeController struct {
	DB *sql.DB
}

func (c *ComponentTypeController) GetComponentTypes (w http.ResponseWriter, r *http.Request) error {

  repo:=repositories.NewComponentTypeRepo(c.DB)

  response, err:=repo.GetComponentTypes()
  if(err!=nil) {
    return WriteJSON(w,400, err)
  }
  return WriteJSON(w,200,response)
}

