package repositories

import (
	"database/sql"
	"plant-tissue-backend/models"
)

type MediumIonRepo struct {
	DB *sql.DB
}

func NewMediumIonRepo(db *sql.DB) *MediumIonRepo {
	return &MediumIonRepo{
		DB: db,
	}
}

func (r *MediumIonRepo) CreateMediumIonRelations() ([]models.MediumIon, error) {
	var data []models.MediumIon
	insert_statement := `insert into medium_ion (medium_id, ion_id, molarity)
			SELECT  medium.id, ion.id, SUM(((medium_component.mg_per_liter / 1000)/component.molar_mass) * component_ion.quantity) as molarity
      FROM medium
        JOIN medium_component ON medium_component.medium_id = medium.id
        JOIN component ON medium_component.component_id = component.id
        JOIN component_ion ON component.id = component_ion.component_id
        JOIN ion ON component_ion.ion_id = ion.id
        GROUP BY ion.id, medium.id ON CONFLICT(medium_id, ion_id) DO UPDATE SET molarity = EXCLUDED.molarity returning *; `
	rows, err := r.DB.Query(insert_statement)
	if err != nil {
		return data, err
	}

	for rows.Next() {
		var e models.MediumIon
		err = rows.Scan(&e.MediumId, &e.Formula, &e.Molarity)
		if err != nil {
			return data, err
		}
		data = append(data, e)
	}

	return data, nil
}

func (r *IonRepo) GetAllMediumIons() ([]models.Ion, error) {
	var data []models.Ion

	rows, err := r.DB.Query(`select * from ion;`)
	if err != nil {
		return data, err
	}

	for rows.Next() {
		var ion models.Ion
		err = rows.Scan(&ion)
		if err != nil {
			return data, err
		}
		data = append(data, ion)
	}

	return data, nil
}
