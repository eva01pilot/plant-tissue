package repositories

import (
	"database/sql"
	"plant-tissue-backend/models"
)

type ComponentTypeRepo struct {
	DB *sql.DB
}

func NewComponentTypeRepo(db *sql.DB) *ComponentTypeRepo {
	return &ComponentTypeRepo{
		DB: db,
	}
}

func (r *ComponentTypeRepo) GetComponentTypes() ([]models.Component_type, error) {
  var data []models.Component_type
  rows,err:=r.DB.Query(`select * from component_type`)
  if(err!=nil) {
    return data, err
  }

  for rows.Next() {
    var component_type_row models.Component_type
    rows.Scan(&component_type_row.Id, &component_type_row.Name, &component_type_row.Has_formula)
    data = append(data, component_type_row)
  }

  return data, nil
}
