package controllers

import (
	"database/sql"
	"net/http"
	"plant-tissue-backend/models"
	"plant-tissue-backend/repositories"
)

type DatasetController struct {
	DB *sql.DB
}

func (c *DatasetController) CreateDatasetEntry(w http.ResponseWriter, r *http.Request) error {
	var body []models.DatasetEntry
	decodeJSONBody(w, r, &body)

	repo := repositories.NewDatasetRepo(c.DB)

	created_component, err := repo.CreateManyDatasetEntries(body)
	println(created_component)

	if err != nil {
		return WriteJSON(w, 400, err.Error())
	}

	return WriteJSON(w, 200, created_component)
}

func (c *DatasetController) GetFullDataset(w http.ResponseWriter, r *http.Request) error {
	repo := repositories.NewDatasetRepo(c.DB)
	ion_repo := repositories.NewIonRepo(c.DB)

	ions, err:= ion_repo.GetAllIons()
	if err != nil {
		return WriteJSON(w, 400, err.Error())
	}

	entry_map:=make(map[string]float32)

	for _, ion:=range ions {
		entry_map[ion.Formula] = 0
	}


	entries, err := repo.GetAllEntries()

	if err != nil {
		return WriteJSON(w, 400, err.Error())
	}




	return nil
}
