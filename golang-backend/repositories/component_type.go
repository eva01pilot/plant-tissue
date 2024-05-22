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
  rows,err:=r.DB.Query(`select * from category_of_component;`)
  if(err!=nil) {
    return data, err
  }

  for rows.Next() {
    var component_type_row models.Component_type
    rows.Scan(&component_type_row.Id, &component_type_row.Name, &component_type_row.Has_formula, &component_type_row.Name_rus)
    println(component_type_row.Id)
    data = append(data, component_type_row)
  }

  return data, nil
}
