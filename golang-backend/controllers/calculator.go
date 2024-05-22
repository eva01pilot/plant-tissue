package controllers

import (
	"database/sql"
	"net/http"
	"plant-tissue-backend/inputs"
	"plant-tissue-backend/models"
	"plant-tissue-backend/repositories"
)

type CalculatorController struct {
	DB *sql.DB
}

func (c *CalculatorController) Calculate(w http.ResponseWriter, r *http.Request) error {
	var body inputs.CalculatorInput
	decodeJSONBody(w, r, &body)

	var calc_result []models.CalculatorResponseRow

	repo := repositories.MediumRepo{DB: c.DB}

	medium, err := repo.GetMediumById(body.Medium_id)

	iters := body.Concentration * body.Volume
	for _, component := range medium.Components {
		calc_result = append(calc_result, models.CalculatorResponseRow{
			Medium_ComponentFull: component,
			Resulting_mass:       component.Mg_per_liter * iters,
		})
	}

	if err != nil {
		return WriteJSON(w, 400, err.Error())
	}

	return WriteJSON(w,200, calc_result)
}
