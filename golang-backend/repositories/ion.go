package repositories

import (
	"database/sql"
	"plant-tissue-backend/models"
)

type IonRepo struct {
	DB *sql.DB
}

func NewIonRepo(db *sql.DB) *IonRepo {
	return &IonRepo{
		DB: db,
	}
}

func (r *IonRepo) GetAllIons() ([]models.Ion, error) {
	var data []models.Ion

	rows, err := r.DB.Query(`select * from ion;`)
	if err != nil {
		return data, err
	}

	for rows.Next() {
		var ion models.Ion
		err = rows.Scan(&ion.Id, &ion.Formula, &ion.Molar_mass)
		if err != nil {
			return data, err
		}
		data = append(data, ion)
	}

	return data, nil
}
