package repositories

import (
	"database/sql"
	"fmt"
	"plant-tissue-backend/models"
)

type MediumRepo struct {
	DB *sql.DB
}

type ManyMediums struct {
	Id                int     `json:"id" form:"id"`
	Name              string  `json:"name" form:"name"`
	Description       string  `json:"description" form:"description"`
	Thumbnail         string  `json:"thumbnail" form:"thumbnail"`
	Component_id      int     `json:"component_id" form:"component_id"`
	Component_name    string  `json:"component_name" form:"component_name"`
	Component_type_id int     `json:"component_type_id" form:"component_type_id"`
	Component_formula string  `json:"component_formula" form:"component_formula"`
	Mass              float32 `json:"mass" form:"mass"`
}

func NewMediumRepo(db *sql.DB) *MediumRepo {
	return &MediumRepo{
		DB: db,
	}
}

func (r *MediumRepo) GetMediumById(id int) (*models.MediumWithComponents, error) {
	var mediums models.MediumWithComponents
	var many_mediums []ManyMediums

	rows, err := r.DB.Query(`SELECT medium.id, medium.name, medium.description, medium.thumbnail,component.id,
component.type_id, component.formula, medium_component.mg_per_liter from public.medium
join public.medium_component on medium.id = medium_id
join component on component.id=component_id WHERE medium.id = $1;`, id)
	if err != nil {
		return nil, err
	}

	for rows.Next() {
		var medium_row ManyMediums
		err := rows.Scan(&medium_row.Id, &medium_row.Name, &medium_row.Description,
			&medium_row.Thumbnail, &medium_row.Component_id, &medium_row.Component_type_id,
			&medium_row.Component_formula,
			&medium_row.Mass)
		if err != nil {
			return nil, err
		}
		many_mediums = append(many_mediums, medium_row)
	}

	medium_map := make(map[int]models.MediumWithComponents)

	for _, v := range many_mediums {
		if entry, ok := medium_map[v.Id]; ok {
			entry.Name = v.Name
			entry.Id = v.Id
			entry.Thumbnail = v.Thumbnail
			entry.Description = v.Description
			entry.Components = append(entry.Components, models.Medium_ComponentFull{
				Component: models.Medium_ComponentRow{
					Id:                v.Component_id,
					Component_formula: v.Component_formula,
					Type_id:           v.Component_type_id,
				},
				Mg_per_liter: v.Mass})
			medium_map[v.Id] = entry
		} else {
			entry.Name = v.Name
			entry.Id = v.Id
			entry.Thumbnail = v.Thumbnail
			entry.Description = v.Description
			entry.Components = append(entry.Components, models.Medium_ComponentFull{
				Component: models.Medium_ComponentRow{
					Id:                v.Component_id,
					Component_formula: v.Component_formula,
					Type_id:           v.Component_type_id,
				},
				Mg_per_liter: v.Mass})
			medium_map[v.Id] = entry
		}
	}

	for _, v := range medium_map {
		println(v.Name)
		mediums = v
	}
	return &mediums, nil
}

func (r *MediumRepo) GetMediums() ([]models.MediumWithComponents, error) {
	var mediums []models.MediumWithComponents
	var many_mediums []ManyMediums

	rows, err := r.DB.Query(`SELECT medium.id, medium.name, medium.description, medium.thumbnail,component.id,
component.type_id, component.formula, medium_component.mg_per_liter from public.medium
join public.medium_component on medium.id = medium_id
join component on component.id=component_id;`)
	if err != nil {
		return nil, err
	}

	for rows.Next() {
		var medium_row ManyMediums
		err := rows.Scan(&medium_row.Id, &medium_row.Name, &medium_row.Description,
			&medium_row.Thumbnail, &medium_row.Component_id, &medium_row.Component_type_id,
			&medium_row.Component_formula,
			&medium_row.Mass)
		if err != nil {
			return nil, err
		}
		many_mediums = append(many_mediums, medium_row)
	}

	medium_map := make(map[int]models.MediumWithComponents)

	for _, v := range many_mediums {
		if entry, ok := medium_map[v.Id]; ok {
			entry.Name = v.Name
			entry.Id = v.Id
			entry.Thumbnail = v.Thumbnail
			entry.Description = v.Description
			entry.Components = append(entry.Components, models.Medium_ComponentFull{
				Component: models.Medium_ComponentRow{
					Id:                v.Component_id,
					Component_formula: v.Component_formula,
					Type_id:           v.Component_type_id,
				},
				Mg_per_liter: v.Mass})
			medium_map[v.Id] = entry
		} else {
			entry.Name = v.Name
			entry.Id = v.Id
			entry.Thumbnail = v.Thumbnail
			entry.Description = v.Description
			entry.Components = append(entry.Components, models.Medium_ComponentFull{
				Component: models.Medium_ComponentRow{
					Id:                v.Component_id,
					Component_formula: v.Component_formula,
					Type_id:           v.Component_type_id,
				},
				Mg_per_liter: v.Mass})
			medium_map[v.Id] = entry
		}
	}

	for _, v := range medium_map {
		println(v.Name)
		mediums = append(mediums, v)
	}
	return mediums, nil
}

func (r *MediumRepo) CreateMedium(medium *models.Medium) (*models.Medium, error) {
	var data models.Medium
	tx, err := r.DB.Begin()
	if err != nil {
		return nil, err
	}

	println(medium.Name, medium.Description)
	row := tx.QueryRow(`insert into medium (name, description, thumbnail) values ($1, $2, $3) returning id;`, medium.Name, medium.Description, medium.Thumbnail)
	err = row.Scan(&data.Id)
	if err != nil {
		return nil, err
	}
	insert_statement := `insert into medium_component (medium_id, component_id, mg_per_liter) values`
	var insert_string string
	for idx, component := range medium.Components {
		if idx != 0 {
			insert_string += ", "
		}
		insert_string += fmt.Sprintf(`(%v,%v,%v)`, data.Id, component.Component_id, component.Mg_per_liter)
		println(component.Component_id)
	}
	insert_statement += insert_string + ";"
	_, err = tx.Exec(insert_statement)
	if err != nil {
		return nil, err
	}
	err = tx.Commit()
	return &data, err
}
