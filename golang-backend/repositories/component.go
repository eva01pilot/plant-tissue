package repositories

import (
	"database/sql"
	"fmt"
	"plant-tissue-backend/inputs"
	"plant-tissue-backend/models"
)

type ComponentRepo struct {
	DB *sql.DB
}

func NewComponentRepo(db *sql.DB) *ComponentRepo {
	return &ComponentRepo{
		DB: db,
	}
}

type ManyComponents struct {
	Id                     int     `json:"id" form:"id"`
	Type_id                int     `json:"type_id,omitempty" form:"type_id,omitempty"`
	Component_formula      string  `json:"component_formula,omitempty" form:"component_formula,omitempty"`
	Component_molar_mass   float32 `json:"component_molar_mass,omitempty" form:"component_molar_mass,omitempty"`
	Ion_id                 int     `json:"ion_id,omitempty" form:"ion_id,omitempty"`
	Ion_molar_mass         float32 `json:"ion_molar_mass,omitempty" form:"ion_molar_mass,omitempty"`
	Ion_component_fraction float32 `json:"ion_component_fraction" form:"ion_component_fraction"`
	Ion_formula            string  `json:"ion_formula,omitempty" form:"ion_formula,omitempty"`
}

func (r *ComponentRepo) SearchComponents(search_string string) ([]ManyComponents, error) {
	var many_components []ManyComponents
	rows, err := r.DB.Query(`SELECT component.id, component.formula from component;`)
	if err != nil {
		return nil, err
	}


	for rows.Next() {
		var components_row ManyComponents
		rows.Scan(&components_row.Id, &components_row.Component_formula)
		many_components = append(many_components, components_row)
	}

	return many_components, nil
}

func (r *ComponentRepo) GetComponents() ([]models.ComponentInput, error) {
	var many_components []ManyComponents
	var components []models.ComponentInput
	rows, err := r.DB.Query(`
  SELECT
  component.id,
  component.type_id,
  component.formula AS component_formula,
  component.molar_mass AS component_molar_mass,
  ion.id AS ion_id,
  ion.molar_mass AS ion_molar_mass,
  component_ion.fraction as ion_component_fraction,
  ion.formula as ion_formula
  FROM component
  JOIN component_ion ON component_ion.component_id = component.id
  JOIN ion ON component_ion.ion_id = ion.id;
`)
	if err != nil {
		return nil, err
	}

	for rows.Next() {
		var components_row ManyComponents
		rows.Scan(&components_row.Id, &components_row.Type_id, &components_row.Component_formula,
			&components_row.Component_molar_mass, &components_row.Ion_id, &components_row.Ion_molar_mass, &components_row.Ion_component_fraction,
			&components_row.Ion_formula)
		many_components = append(many_components, components_row)
	}

	component_map := make(map[int]models.ComponentInput)

	for _, v := range many_components {
		if entry, ok := component_map[v.Id]; ok {
			entry.Type_id = v.Type_id
			entry.Molar_mass = v.Component_molar_mass
			entry.Formula = v.Component_formula
			entry.Ions = append(entry.Ions, models.Component_ion_full{Ion_id: v.Ion_id,
				Fraction:   v.Ion_component_fraction,
				Formula:    v.Ion_formula,
				Molar_mass: v.Ion_molar_mass})
			component_map[v.Id] = entry
		} else {
			entry.Type_id = v.Type_id
			entry.Formula = v.Component_formula
			entry.Ions = append(entry.Ions, models.Component_ion_full{Ion_id: v.Ion_id,
				Fraction:   v.Ion_component_fraction,
				Formula:    v.Ion_formula,
				Molar_mass: v.Ion_molar_mass})
			component_map[v.Id] = entry
		}
	}

	for _, v := range component_map {
		components = append(components, v)
	}

	return components, nil

}

func (r *ComponentRepo) CreateManyComponents(components []inputs.CreateComponentFromCsvRow) ([]models.Component, error) {
	tx, err := r.DB.Begin()
	if err != nil {
		return nil, err
	}

	for _, component := range components {
		var component_id int

		insert_component_statement := "insert into component(type_id, formula, molar_mass) values"
		insert_component_statement += fmt.Sprintf("(%v, '%v', %v) ON CONFLICT(formula) DO UPDATE SET formula = excluded.formula RETURNING id", component.Type_id, component.Formula, component.Molar_mass)
		res := tx.QueryRow(insert_component_statement)
    err:=res.Err()
    if(err!=nil) {
      panic(err.Error())
    }
		res.Scan(&component_id)
		println(component_id)

		insert_component_ion := fmt.Sprintf(`insert into component_ion (component_id, ion_id, fraction, quantity)
      values (%v, (SELECT id FROM ion WHERE formula = '%v'), %v, %v) ON CONFLICT(component_id, ion_id) DO UPDATE SET
      (component_id, ion_id, fraction, quantity) = (EXCLUDED.component_id, EXCLUDED.ion_id, EXCLUDED.fraction, EXCLUDED.quantity)`,
      component_id, component.Ion_formula, component.Ion_fraction, component.Ion_quantity)
		res = tx.QueryRow(insert_component_ion)
    err=res.Err()
    if(err!=nil) {
      panic(err.Error())
    }
	}

	tx.Commit()

	return nil, err
}

func (r *ComponentRepo) CreateComponent(component *inputs.CreateComponentInput) (*models.Component, error) {
	var data models.Component
	tx, err := r.DB.Begin()
	if err != nil {
		return nil, err
	}
	row := tx.QueryRow(`insert into component (type_id, formula, molar_mass) values ($1, $2,$3) returning id`, component.Type_id, component.Formula, component.Molar_mass)
	err = row.Scan(&data.Id)
	if err != nil {
		return nil, err
	}
	insert_statement := `insert into component_ion (component_id, ion_id, fraction) values`
	var insert_string string
	for idx, element := range component.Ions {
		if idx != 0 {
			insert_string += ", "
		}
		insert_string += fmt.Sprintf(`(%v,%v,%v)`, data.Id, element.Ion_id, element.Fraction)
	}
	insert_statement += insert_string + ";"
	_, err = tx.Exec(insert_statement)
	if err != nil {
		return nil, err
	}
	tx.Commit()
	return &data, nil
}
