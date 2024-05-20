package controllers

import (
	"database/sql"
	"net/http"
	"plant-tissue-backend/inputs"
	"plant-tissue-backend/models"
	"plant-tissue-backend/repositories"
	"strings"
)

type MediumController struct {
	DB *sql.DB
}


func (c *MediumController) GetMediums(w http.ResponseWriter, r *http.Request) error {
  repo:=repositories.NewMediumRepo(c.DB)

  var mediums []models.MediumWithComponents

  mediums, err:= repo.GetMediums()
  if(err!=nil) {
    return WriteJSON(w,400, err.Error())
  }
  return WriteJSON(w,200,mediums)
}

func (c *MediumController) CreateMedium(w http.ResponseWriter, r *http.Request) error {
	var body inputs.CreateMediumInput
	err := r.ParseMultipartForm(10000000)
	if err != nil {
		return WriteJSON(w, 400, err.Error())
	}
	err = inputs.ParseMedium(r, &body)
	if err != nil {
		return WriteJSON(w, 400, err.Error())
	}

	pathP, err := WriteFormFile(body.Thumbnail, "mediums")
	path := *pathP

  path = strings.Replace(path,"/app", "https://api.ilyadev.com",1)

	repo := repositories.NewMediumRepo(c.DB)
	var components []models.Medium_Component

	for _, v := range body.Components {
    components = append(components, models.Medium_Component{Component_id: v.Component_id, Mg_per_liter: float32(v.Mg_per_liter)})
	}
	medium := &models.Medium{Name: body.Name, Thumbnail: path, Components: components, Description: body.Description}

	medium, err = repo.CreateMedium(medium)
	if err != nil {
		return WriteJSON(w, 400, err.Error())
	}

	return WriteJSON(w, 200, body)
}
