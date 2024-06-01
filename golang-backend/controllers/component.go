package controllers

import (
	"database/sql"
	"net/http"
	"plant-tissue-backend/inputs"
	"plant-tissue-backend/repositories"
)

type ComponentController struct {
	DB *sql.DB
}



func (c *ComponentController) GetComponents(w http.ResponseWriter, r *http.Request) error {

	repo := repositories.NewComponentRepo(c.DB)

	response, err := repo.GetComponents()
	if err != nil {
		return WriteJSON(w, 400, err)
	}
	return WriteJSON(w, 200, response)
}

func (c *ComponentController) CreateComponent(w http.ResponseWriter, r *http.Request) error {
	var body inputs.CreateComponentInput
	decodeJSONBody(w, r, &body)

	repo := repositories.NewComponentRepo(c.DB)

	created_component, err := repo.CreateComponent(&body)
  println(created_component)

	if err != nil {
		return WriteJSON(w, 400, err.Error())
	}

	return WriteJSON(w, 200, created_component)
}

func (c *ComponentController) SearchComponents(w http.ResponseWriter, r *http.Request) error {
	var body inputs.SearchComponentInput
	decodeJSONBody(w, r, &body)
	repo := repositories.NewComponentRepo(c.DB)
	components, err := repo.SearchComponents(body.Search)

	if err != nil {
		return WriteJSON(w, 400, err.Error())
	}

	return WriteJSON(w, 200, components)

}
